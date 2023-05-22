import { List, Text } from "@mantine/core";
import React, { ReactElement, ReactNode } from "react";

export const enum ErrorTypes {
  SENDER_CANCELLED,
  SENDER_BAD_CODE,
  RECEIVER_CANCELLED,
  RECEIVER_BAD_CODE,
  RECEIVER_REJECTED,
  MAILBOX_RELAY_CONNECTION,
  UNKNOWN,
}

export function detectErrorType(error: string) {
  if (error.match(/Failed to send.+Task has been cancelled/i)) {
    return ErrorTypes.SENDER_CANCELLED;
  } else if (error.match(/Failed to receive.+Task has been cancelled/i)) {
    return ErrorTypes.RECEIVER_CANCELLED;
  } else if (error.includes("transfer rejected")) {
    return ErrorTypes.RECEIVER_REJECTED;
  } else if (error.startsWith("Bad code:")) {
    return ErrorTypes.RECEIVER_BAD_CODE;
  } else if (error.startsWith("Failed to connect to")) {
    return ErrorTypes.MAILBOX_RELAY_CONNECTION;
  } else {
    return ErrorTypes.UNKNOWN;
  }
}

export function errorContent(type: ErrorTypes): {
  title: string;
  description: ReactElement | ReactNode[];
} {
  switch (type) {
    case ErrorTypes.SENDER_CANCELLED: {
      return {
        title: "Transfer cancelled/interrupted",
        description: (
          <>
            <Text component="p">Either:</Text>
            <Text component="p"></Text>
            <Text component="p">
              - The transfer was cancelled by the receiver.
            </Text>
            <Text component="p">
              - Your or the receiver's Internet connection was interrupted.
            </Text>
            <Text component="p"></Text>
            <Text component="p">Please try again.</Text>
          </>
        ),
      };
    }
    case ErrorTypes.RECEIVER_CANCELLED: {
      return {
        title: "Transfer cancelled/interrupted",
        description: (
          <>
            <Text component="p">Either:</Text>
            <Text component="p"></Text>
            <Text component="p">
              - The transfer was cancelled by the sender.
            </Text>
            <Text component="p">
              - Your or the sender's Internet connection was interrupted.
            </Text>
            <Text component="p"></Text>
            <Text component="p">Please try again.</Text>
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
    case ErrorTypes.RECEIVER_BAD_CODE: {
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
        description: (
          <Text component="p">
            Unfortunately, Winden cannot connect to the Least Authority servers.
            Please try again or let us know at contact@winden.app if the problem
            remains.
          </Text>
        ),
      };
    }
    case ErrorTypes.UNKNOWN: {
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
