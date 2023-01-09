import {
  Button,
  Center,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import StaticPage from "../StaticPage";

type Props = {};

export default function FeedbackPage({}: Props) {
  const [value, setValue] = useState("");
  return (
    <StaticPage>
      <h1>Loving Winden? Meh? Kind of? 😍</h1>
      <Stack spacing="lg">
        <p>
          Regardless, we would enjoy hearing from you! Please complete this
          anonymous feedback form to help us improve future or send us an email
          at <a href="mailto:feedback@winden.app">feedback@winden.app</a> with
          any thoughts you may have about using Winden.
        </p>
        <Textarea
          label="1. What's great (if anything)?"
          placeholder="Please describe what you like about Winden."
        />
        <Textarea
          label="2. What do you find Winden useful for?"
          placeholder="Please describe the key purposes you use Winden for (e.g., sending large video files to clients; sending text files between my devices)."
        />
        <Textarea
          label="3. What's missing or what's not great?"
          placeholder="Please describe any missing functionality that's important to you, or anything else you'd like to see improved."
        />
        <Group spacing={0}>
          <Text weight="bold">
            4. On a scale of 1-5, how likely are you to recommend Winden to a
            friend or colleague?&nbsp;
          </Text>
          <Text color="dimmed">
            (1 = Definitely not, 5 = Yes, I will do it now.)
          </Text>
        </Group>
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
          fullWidth
        />
        <Center>
          <Button color="yellow">Submit</Button>
        </Center>
      </Stack>
    </StaticPage>
  );
}
