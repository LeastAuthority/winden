import { Button, Group, Modal, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { errorContent, ErrorTypes } from "../../util/errors";

const TRANSITION_DURATION = 250;

export const ErrorContext =
  React.createContext<{
    setError: React.Dispatch<React.SetStateAction<ErrorTypes | null>>;
  } | null>(null);

type Props = React.PropsWithChildren<{}>;

export default function ErrorProvider(props: Props) {
  const [error, setError] = useState<ErrorTypes | null>(null);
  const [opened, setOpened] = useState(false);
  const errorText = error !== null ? errorContent(error) : null;

  useEffect(() => {
    setOpened(error !== null);
  }, [error]);

  useEffect(() => {
    // Wait until modal transition is finished before clearing the error.
    // Otherwise you won't see the message fade away with the modal; it's removed instantly.
    if (!opened) {
      setTimeout(() => {
        setError(null);
      }, TRANSITION_DURATION);
    }
  }, [opened]);

  return (
    <ErrorContext.Provider value={{ setError }}>
      {props.children}
      <Modal
        transitionDuration={TRANSITION_DURATION}
        opened={opened}
        onClose={() => setOpened(false)}
        title={errorText?.title}
        withCloseButton={false}
        padding={30}
      >
        {errorText?.description.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
        <Space h="md" />
        <Group position="right">
          <Button onClick={() => setOpened(false)}>Ok</Button>
        </Group>
      </Modal>
    </ErrorContext.Provider>
  );
}
