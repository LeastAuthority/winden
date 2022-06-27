import { Group, Text, Title } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React from "react";
import { Upload } from "tabler-icons-react";

type Props = {};

export default function SendBeginScreen({}: Props) {
  return (
    <div data-testid="send-page-upload-section">
      <Title order={1}>Send files in real-time</Title>
      <Title order={2}>
        We don’t store – and can’t read – your files. We simply transfer them.
      </Title>
      <Title order={2}>No sign-ups. No snooping. No nonsense. </Title>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={2 * 10 ** 8}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        {(status) => (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <Upload />
            <div>
              <Text size="xl" inline>
                Drag file here or click to select file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                File should not exceed 200MB
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>
    </div>
  );
}
