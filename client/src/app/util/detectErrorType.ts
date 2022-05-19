// TODO: given the string error provided on the go side, return a enum type.
export const enum ErrorTypes {
  RECV_CONNECTION_TIMEOUT,
  BAD_CODE,
  MAILBOX,
  RELAY,
  INTERRUPT,
}

export function detectErrorType(error: string) {
  if (/^decrypt message failed$/.test(error)) {
    return ErrorTypes.BAD_CODE;
  } else if (/.*$rendezvousURL.*/.test(error)) {
    return ErrorTypes.MAILBOX;
  } else if (
    /(^websocket.Dial failed|failed to establish connection$)|(.*$transitRelayURL.*)/.test(
      error
    )
  ) {
    return ErrorTypes.RELAY;
  } else if (
    /(^failed to read: WebSocket closed: unclean connection.*status = StatusAbnormalClosure.*reason = ""$)|(.*$transitRelayURL.*)$/.test(
      error
    )
  ) {
    return ErrorTypes.INTERRUPT;
  } else {
    return ErrorTypes.RECV_CONNECTION_TIMEOUT;
  }
}
