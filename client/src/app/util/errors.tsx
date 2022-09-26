import { List, Text } from "@mantine/core";
import React, { ReactElement, ReactNode } from "react";

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
  } else if (
    /^decrypt message failed$/.test(error) ||
    error.startsWith("Nameplate is unclaimed")
  ) {
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
        description: (
          <>
            <Text component="p">
              There was an issue with either your or the receiver's connection.
            </Text>
            <Text component="p">Please try again with a new code.</Text>
          </>
        ),
      };
    }
    case ErrorTypes.WASM_EXITED: {
      return {
        title: "Oops...",
        description: [
          <Text component="p">An unexpected error occurred.</Text>,
          <Text component="p">
            Please refresh the page before trying again.
          </Text>,
        ],
      };
    }
  }
}
