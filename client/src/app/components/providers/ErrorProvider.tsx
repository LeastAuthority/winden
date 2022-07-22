import { Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { errorContent, ErrorTypes } from "../../util/errors";

export const ErrorContext =
  React.createContext<{
    setError: React.Dispatch<React.SetStateAction<ErrorTypes | null>>;
  } | null>(null);

type Props = React.PropsWithChildren<{}>;

export default function ErrorProvider(props: Props) {
  const [error, setError] = useState<ErrorTypes | null>(null);
  const errorText = error !== null ? errorContent(error) : null;

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorContext.Provider value={{ setError }}>
      {props.children}
      <Modal
        opened={error !== null}
        onClose={() => {
          setError(null);
        }}
        title={errorText?.title}
      >
        {errorText?.description.map((line) => (
          <Text>{line}</Text>
        ))}
      </Modal>
    </ErrorContext.Provider>
  );
}
