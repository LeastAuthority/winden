export const enum ErrorTypes {
  RECV_CONNECTION_TIMEOUT,
  SENDER_BAD_CODE,
  BAD_CODE,
  MAILBOX,
  RELAY,
  INTERRUPT,
  WASM_EXITED,
}

const ServerErrorMsg =
  "Unfortunately, the site cannot connect to the [Product name] server. Please try again or let us know at support@domainname if the problem remains.";

export function detectErrorType(error: string) {
  if (/^SendErr: decrypt message failed$/.test(error)) {
    return ErrorTypes.SENDER_BAD_CODE;
  } else if (/^decrypt message failed$/.test(error)) {
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

export function errorContent(type: ErrorTypes): {
  title: string;
  description: string[];
} {
  switch (type) {
    case ErrorTypes.RECV_CONNECTION_TIMEOUT: {
      return {
        title: "Connection time-out",
        description: [
          "It looks like the connection between you and the sender was briefly lost.",
          "Please ask the sender for a new code.",
        ],
      };
    }
    case ErrorTypes.SENDER_BAD_CODE: {
      return {
        title: "Oops...",
        description: [
          "The receiver has entered the wrong code. ",
          "Please try sending the file again and provide the receiver with a new code.",
        ],
      };
    }
    case ErrorTypes.BAD_CODE: {
      return {
        title: "Oops...",
        description: [
          "Something went wrong. Possibly:",
          "- The code is wrong; or",
          "- The code was already used; or",
          "- The sender is no longer connected.",
          "Please try sending the file again and provide the receiver with a new code.",
        ],
      };
    }
    case ErrorTypes.MAILBOX: {
      return {
        title: "",
        description: [ServerErrorMsg],
      };
    }
    case ErrorTypes.RELAY: {
      return {
        title: "",
        description: [ServerErrorMsg],
      };
    }
    case ErrorTypes.INTERRUPT: {
      return {
        title: "Network trouble?",
        description: [
          "There was an issue with either your or the receiver's connection.",
          "Please try again with a new code.",
        ],
      };
    }
    case ErrorTypes.WASM_EXITED: {
      return {
        title: "Oops...",
        description: [
          "An unexpected error occurred.",
          "Please refresh the page before trying again.",
        ],
      };
    }
  }
}
