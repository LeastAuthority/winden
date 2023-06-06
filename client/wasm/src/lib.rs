use futures::future::BoxFuture;
use futures::io::{AsyncRead, Error};
use futures::AsyncWrite;
use magic_wormhole::rendezvous::RendezvousError;
use magic_wormhole::transfer::{ReceiveRequest, TransferError};
use std::borrow::Cow;
use std::future::Future;
use std::panic;
use std::pin::Pin;
use std::task::{Context, Poll};
use thiserror::Error;

use magic_wormhole::{transfer, transit, AppID, Code, Wormhole, WormholeError};
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn init() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

struct NoOpFuture {}

impl Future for NoOpFuture {
    type Output = ();

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Pending
    }
}

#[derive(Error, Debug)]
pub enum WasmWormholeError {
    #[error("Failed to connect to wormhole")]
    WormholeConnectionFailed(#[from] WormholeError),
    #[error("Failed to connect to rendezvous")]
    RendezvousConnectionFailed(#[from] RendezvousError),
    #[error("Transfer failed")]
    TransferFailed(#[from] TransferError),
    #[error("Bad code: {0}")]
    BadCode(WormholeError),
    #[error("Request cancelled")]
    RequestCancelled,
    #[error("Failed to send: {0}")]
    SendError(TransferError),
    #[error("Failed to receive: {0}")]
    ReceiveError(TransferError),
    #[error("Failed to read file")]
    FailedToReadFile,
}

impl From<WasmWormholeError> for JsValue {
    fn from(value: WasmWormholeError) -> Self {
        value.to_string().into()
    }
}

#[wasm_bindgen]
pub struct Client {
    appid: AppID,
    rendezvous_url: String,
    transit_server_url: String,
    passphrase_component_len: usize,
}

#[wasm_bindgen]
impl Client {
    pub fn new(
        appid: &str,
        rendezvous_url: &str,
        transit_server_url: &str,
        passphrase_component_len: usize,
    ) -> Self {
        Self {
            appid: appid.to_string().into(),
            rendezvous_url: rendezvous_url.to_string(),
            transit_server_url: transit_server_url.to_string(),
            passphrase_component_len: passphrase_component_len,
        }
    }
}

#[wasm_bindgen]
pub struct SendResult {
    code: String,
    f: Option<BoxFuture<'static, Result<Wormhole, WormholeError>>>,
    transit_server_url: String,
    file: web_sys::File,
}

#[wasm_bindgen]
impl SendResult {
    pub fn get_code(&self) -> String {
        self.code.clone()
    }
}

/**
 * Initializes a file transfer as a sender.
 * After calling this function successfully, use [upload_file] to begin sending the file to the receiver.
 */
#[wasm_bindgen]
pub async fn send(client: &Client, file: web_sys::File) -> Result<SendResult, WasmWormholeError> {
    match wasm_bindgen_futures::JsFuture::from(file.array_buffer()).await {
        Ok(_) => {}
        Err(_) => return Err(WasmWormholeError::FailedToReadFile),
    };

    let rendezvous = Box::new(client.rendezvous_url.as_str());
    let config = transfer::APP_CONFIG.rendezvous_url(Cow::Owned(rendezvous.to_string()));
    let (server_welcome, wormhole_future) = Wormhole::connect_without_code(config, 2).await?;

    Ok(SendResult {
        code: server_welcome.code.0,
        transit_server_url: client.transit_server_url.clone(),
        f: Some(Box::pin(wormhole_future)),
        file,
    }
    .into())
}

/**
 * Begins transferring the file as a sender.
 * Resolves once the file transfer is completed.
 *
 * See also: [send]
 */
#[wasm_bindgen]
pub async fn upload_file(
    mut send_result: SendResult,
    opts: JsValue,
    promise: js_sys::Promise,
) -> Result<JsValue, WasmWormholeError> {
    let progress_func = js_sys::Reflect::get(&opts, &"progress".into())
        .expect("`opts.progress` should not be undefined");
    if !progress_func.is_function() {
        panic!("`opts.progress` should be a function")
    }
    let progress_func = js_sys::Function::from(progress_func);

    let f = send_result.f.take().expect("f should not be empty");

    let future = wasm_bindgen_futures::JsFuture::from(promise);

    let wormhole = f.await?;

    if let Ok(on_peer_connected_func) = js_sys::Reflect::get(&opts, &"on_peer_connected".into()) {
        let on_peer_connected_func = js_sys::Function::from(on_peer_connected_func);
        on_peer_connected_func
            .call0(&JsValue::UNDEFINED)
            .expect("Failed to call on_peer_connected");
    }

    let file_name = send_result.file.name();
    let file_size = send_result.file.size() as u64;
    let mut file_wrapper = FileWrapper::new(send_result.file);
    match transfer::send_file(
        wormhole,
        vec![transit::RelayHint::new(
            None,
            vec![],
            vec![url::Url::parse(&send_result.transit_server_url).unwrap()],
        )],
        &mut file_wrapper,
        file_name,
        file_size,
        transit::Abilities::FORCE_RELAY,
        |_info| {},
        move |cur, total| {
            progress_func
                .call2(&JsValue::UNDEFINED, &cur.into(), &total.into())
                .unwrap();
        },
        async {
            match future.await {
                _ => (),
            }
        },
    )
    .await
    {
        Ok(_) => Ok(JsValue::UNDEFINED),
        Err(e) => Err(WasmWormholeError::SendError(e)),
    }
}

#[wasm_bindgen]
pub struct ReceiveResult {
    req: Option<ReceiveRequest>,
    file_name: String,
    pub file_size: u64,
}

#[wasm_bindgen]
impl ReceiveResult {
    pub fn get_file_name(&self) -> String {
        self.file_name.clone()
    }
}

/**
 * Requests to receive a file from a sender.
 * After successfully calling this function, use [download_file] to begin download, or [reject_file] to cancel download request.
 */
#[wasm_bindgen]
pub async fn receive(client: &Client, code: String) -> Result<ReceiveResult, WasmWormholeError> {
    let rendezvous = Box::new(client.rendezvous_url.as_str());
    let config = transfer::APP_CONFIG.rendezvous_url(Cow::Owned(rendezvous.to_string()));

    let wormhole = match Wormhole::connect_with_code(config, Code(code), true).await {
        Ok((_, x)) => x,
        Err(e) => return Err(WasmWormholeError::BadCode(e)),
    };

    let req = transfer::request_file(
        wormhole,
        vec![transit::RelayHint::new(
            None,
            vec![],
            vec![url::Url::parse(&client.transit_server_url).unwrap()],
        )],
        transit::Abilities::FORCE_RELAY,
        NoOpFuture {},
    )
    .await?;

    match req {
        Some(req) => {
            let file_name = req.filename.clone();
            let file_size = req.filesize;

            Ok(ReceiveResult {
                req: Some(req),
                file_name: file_name.to_str().unwrap().to_owned(),
                file_size,
            }
            .into())
        }
        None => Err(WasmWormholeError::RequestCancelled),
    }
}

/**
 * Begins downloading the file as a receiver.
 * Resolves once the file transfer is completed.
 *
 * See also: [receive]
 */
#[wasm_bindgen]
pub async fn download_file(
    mut receive_result: ReceiveResult,
    opts: JsValue,
    promise: js_sys::Promise,
) -> Result<JsValue, WasmWormholeError> {
    let progress_func = js_sys::Reflect::get(&opts, &"progress".into())
        .expect("`opts.progress` should not be undefined");
    if !progress_func.is_function() {
        panic!("`opts.progress` should be a function")
    }
    let progress_func = js_sys::Function::from(progress_func);
    let req = receive_result.req.take().expect("req should not be empty");
    let mut file_writer = FileWriter::new(opts);

    let future = wasm_bindgen_futures::JsFuture::from(promise);

    match req
        .accept(
            |_info| {},
            move |cur, total| {
                progress_func
                    .call2(&JsValue::UNDEFINED, &cur.into(), &total.into())
                    .unwrap();
            },
            &mut file_writer,
            async {
                match future.await {
                    _ => (),
                }
            },
        )
        .await
    {
        Ok(_) => Ok(JsValue::UNDEFINED),
        Err(e) => Err(WasmWormholeError::ReceiveError(e)),
    }
}

/**
 * Rejects the file as a receiver
 *
 * See also: [receive]
 */
#[wasm_bindgen]
pub async fn reject_file(mut receive_result: ReceiveResult) -> Result<JsValue, JsValue> {
    let req = receive_result.req.take().expect("req should not be empty");
    match req.reject().await {
        Ok(_) => Ok(JsValue::UNDEFINED),
        Err(_) => Err(JsValue::UNDEFINED),
    }
}

struct FileWriter {
    writer: JsValue,
}

impl FileWriter {
    fn new(writer: JsValue) -> Self {
        FileWriter {
            writer,
        }
    }
}

impl AsyncWrite for FileWriter {
    fn poll_close(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<std::io::Result<()>> {
        // closing should be handled on the client side
        Poll::Ready(Ok(()))
    }
    fn poll_flush(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<std::io::Result<()>> {
        // we don't buffer any data
        Poll::Ready(Ok(()))
    }
    fn poll_write(
        mut self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &[u8],
    ) -> Poll<std::io::Result<usize>> {
        let write =
            js_sys::Reflect::get(&self.writer, &"write".into()).expect("writer.write is undefined");
        if !write.is_function() {
            panic!("writer.write is not a function")
        }
        let write_fn = js_sys::Function::from(write);
        let abuf = js_sys::ArrayBuffer::new(buf.len() as u32);
        let uarr = js_sys::Uint8Array::new(&abuf);
        uarr.copy_from(buf);
        let write_call = write_fn.call1(&JsValue::UNDEFINED, &uarr.into());
        Poll::Ready(Ok(buf.len()))
    }
}

struct FileWrapper {
    file: web_sys::File,
    size: i32,
    index: i32,
    f: Box<Option<JsFuture>>,
}

impl FileWrapper {
    fn new(file: web_sys::File) -> Self {
        let size = file.size();
        FileWrapper {
            file,
            size: size as i32,
            index: 0,
            f: Box::new(None),
        }
    }
}

impl AsyncRead for FileWrapper {
    fn poll_read(
        mut self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &mut [u8],
    ) -> Poll<Result<usize, Error>> {
        let start = self.index;
        let end = i32::min(start + buf.len() as i32, self.size);

        if let Some(f) = &mut *self.f {
            let p = Pin::new(&mut *f);
            match p.poll(cx) {
                Poll::Pending => Poll::Pending,
                Poll::Ready(array_buffer) => {
                    let abuf: js_sys::ArrayBuffer = array_buffer.unwrap().into();
                    let abuf_size = abuf.byte_length() as usize;
                    js_sys::Uint8Array::new(&abuf).copy_to(&mut buf[..abuf_size]);
                    self.f = Box::new(None);
                    let size = end - start;
                    self.index += size;
                    Poll::Ready(Ok(size as usize))
                }
            }
        } else {
            let blob = self.file.slice_with_i32_and_i32(start, end).unwrap();

            let mut array_buffer_future: JsFuture = blob.array_buffer().into();
            let p = Pin::new(&mut array_buffer_future);
            match p.poll(cx) {
                _ => {
                    self.f = Box::new(Some(array_buffer_future));
                    Poll::Pending
                }
            }
        }
    }
}
