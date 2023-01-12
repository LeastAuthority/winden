import { List, Text } from "@mantine/core";
import React, { ReactElement, ReactNode } from "react";

export const enum ErrorTypes {
  RECV_CONNECTION_TIMEOUT,
  SENDER_BAD_CODE,
  RECEIVER_REJECTED,
  BAD_CODE,
  MAILBOX_RELAY_CONNECTION,
  INTERRUPT,
  WASM_EXITED,
}

const ServerErrorMsg =
  "Unfortunately, Winden cannot connect to the Least Authority servers. Please try again or let us know at contact@winden.app if the problem remains.";

export function detectErrorType(error: string) {
  console.log("Error details: ", error);
  if (/^SendErr: decrypt message failed$/.test(error)) {
    return ErrorTypes.SENDER_BAD_CODE;
  } else if (/(.*transfer rejected.*)/.test(error)) {
    return ErrorTypes.RECEIVER_REJECTED;
  } else if (
    /^decrypt message failed$/.test(error) ||
    error.startsWith("Nameplate is unclaimed")
  ) {
    return ErrorTypes.BAD_CODE;
    // cases: this can happen before transfer, but also during the transfer.
    // TODO: separate error messages depending when it happens
  } else if (
    /(.*unclean connection close.*)|(.*websocket.Dial failed.*)|(failed to establish connection$)|(^WebSocket connection to.*failed.*)/.test(
      error
    )
  ) {
    return ErrorTypes.MAILBOX_RELAY_CONNECTION;
  } else if (/(.*unknown send result.*)/.test(error)) {
    return ErrorTypes.INTERRUPT;
  } else {
    return ErrorTypes.RECV_CONNECTION_TIMEOUT;
  }
}

export function errorContent(type: ErrorTypes): {
  title: string;
  description: ReactElement | ReactNode[];
} {
  switch (type) {
    case ErrorTypes.RECV_CONNECTION_TIMEOUT: {
      return {
        title: "Connection time-out",
        description: (
          <>
            <Text component="p">
              It looks like the connection between you and the sender was
              briefly lost.
            </Text>
            <Text component="p">Please ask the sender for a new code.</Text>
          </>
        ),
      };
    }
    case ErrorTypes.RECEIVER_REJECTED: {
      return {
        title: "Transfer cancelled",
        description: (
          <>
            <Text component="p">The receiver rejected this transfer.</Text>
            <Text component="p">
              Please try sending the file again or contact the receiver.
            </Text>
          </>
        ),
      };
    }
    case ErrorTypes.SENDER_BAD_CODE: {
      return {
        title: "Oops...",
        description: (
          <>
            <Text component="p">The receiver has entered the wrong code.</Text>
            <Text component="p">
              Please try sending the file again and provide the receiver with a
              new code.
            </Text>
          </>
        ),
      };
    }
    case ErrorTypes.BAD_CODE: {
      return {
        title: "Oops...",
        description: (
          <>
            <Text component="p">Something went wrong. Possibly:</Text>
            <List>
              <List.Item>The code is wrong; or</List.Item>
              <List.Item>The code was already used; or</List.Item>
              <List.Item>The sender is no longer connected.</List.Item>
            </List>
            <Text component="p"></Text>
            <Text component="p">
              Please ask the sender for a new code and for them to stay
              connected until you get the file.
            </Text>
          </>
        ),
      };
    }
    case ErrorTypes.MAILBOX_RELAY_CONNECTION: {
      return {
        title: "Oops",
        description: [ServerErrorMsg],
      };
    }
    case ErrorTypes.INTERRUPT: {
      return {
        title: "Transfer cancelled/interrupted",
        description: (
          <>
            <Text component="p">
              The transfer was cancelled or interrupted.
            </Text>
            <Text component="p">Please try again.</Text>
          </>
        ),
      };
    }
    case ErrorTypes.WASM_EXITED: {
      return {
        title: "Something went wrong",
        description: [
          <Text component="p">
            Please refresh the page and try again or let us know at
            contact@winden.app if the problem remains.
          </Text>,
        ],
      };
    }
  }
}
