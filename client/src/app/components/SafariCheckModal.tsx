import { Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { browserIsProbablySafari } from "../util/browserIsProbablySafari";

type Props = {};

export default function SafariCheckModal({}: Props) {
  const [opened, setOpened] = useState(
    process.env.NODE_ENV === "production" && !!browserIsProbablySafari
  );

  return (
    <Modal
      centered
      title="Safari not supported"
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <Text>
        We plan to support Safari in future releases. Please try with a
        different browser.
      </Text>
    </Modal>
  );
}
