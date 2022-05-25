export const WASM_READY = "client/wasm_ready";
export const NEW_CLIENT = "client/new";
export const SEND_TEXT = "client/send_text";
export const RECV_TEXT = "client/recv_text";
export const SEND_FILE = "client/send_file";
export const SEND_FILE_CANCEL = "client/send_file/cancel";
export const SEND_FILE_PROGRESS = "client/send_file/progress";
export const SEND_FILE_ERROR = "client/send_file/error";
export const SEND_FILE_RESULT_OK = "client/send_file/result/ok";
export const SEND_FILE_RESULT_ERROR = "client/send_file/result/error";
export const RECV_FILE = "client/recv_file";
export const RECV_FILE_PROGRESS = "client/recv_file/progress";
export const RECV_FILE_OFFER = "client/recv_file/offer";
export const RECV_FILE_OFFER_ACCEPT = "client/recv_file/offer/accept";
export const RECV_FILE_OFFER_REJECT = "client/recv_file/offer/reject";
export const RECV_FILE_READ = "client/recv_file/read";
export const RECV_FILE_DATA = "client/recv_file/data";
export const RECV_FILE_ERROR = "client/recv_file/error";
export const RECV_FILE_READ_ERROR = "client/recv_file/read/error";
export const FREE = "client/free";
export const SAVE_FILE = "client/save_file";

export const SET_FILE_META = "set_file_meta";
export const ACCEPT_FILE = "accept_file";
export const SET_CODE = "set_code";
export const RESET_CODE = "reset_code";
export const SET_PROGRESS = "set_progress";
export const RESET_PROGRESS = "reset_progress";
export const NEXT_STEP = "next_step";
export const UPDATE_PROGRESS_ETA = "update_progress_eta";
export const ALERT = "alert";
export const COMPLETE_CODE_WORD = "complete_code_word";
export const ALERT_MATCHED_ERROR = "alert_matched_error";
export const SHOW_DRAG_ELEMENTS = "send_default/show_drag_elements";
export const HIDE_DRAG_ELEMENTS = "send_default/hide_drag_elements";

export interface RPCMessage {
  id: number;

  // TODO: be more specific (i.e. message types w/ union)
  [name: string]: any;
}

export function isRPCMessage(data: any): data is RPCMessage {
  return (data as RPCMessage) !== undefined;
}
