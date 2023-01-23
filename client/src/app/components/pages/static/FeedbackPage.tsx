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
import { useFlash } from "../../../hooks/useFlash";
import { useNavigate } from "../../../hooks/useNavigate";
import StaticPage from "../StaticPage";

const QUESTION_SENTENCES = {
  whatsGreat: "What's great (if anything)?",
  whatsUseful: "What do you find Winden useful for?",
  whatsNotGreat: "What's missing or what's not great?",
};

function submitFeedback(
  rating: number,
  whatsGreat: string,
  whatsUseful: string,
  whatsNotGreat: string
) {
  return fetch(`/v1/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: "winden.app",
      feedback: {
        title: "Full Feedback Form",
        rate: {
          type: "numbers",
          value: rating,
        },
        questions: [
          {
            question: QUESTION_SENTENCES.whatsGreat,
            answer: whatsGreat,
          },
          {
            question: QUESTION_SENTENCES.whatsUseful,
            answer: whatsUseful,
          },
          {
            question: QUESTION_SENTENCES.whatsNotGreat,
            answer: whatsNotGreat,
          },
        ],
      },
    }),
  });
}

type Props = {};

export default function FeedbackPage({}: Props) {
  const [rating, setRating] = useState("");
  const [whatsGreat, setWhatsGreat] = useState("");
  const [whatsUseful, setWhatsUseful] = useState("");
  const [whatsNotGreat, setWhatsNotGreat] = useState("");
  const [error, setError] = useState(false);
  const flash = useFlash();
  const navigate = useNavigate();

  async function handleSubmit() {
    // validation
    if (!rating && !whatsGreat && !whatsUseful && !whatsNotGreat) {
      setError(true);
    } else {
      const response = await submitFeedback(
        parseInt(rating),
        whatsGreat,
        whatsUseful,
        whatsNotGreat
      );
      if (response.ok) {
        navigate("/s");
        flash?.set({
          title: "Feedback sent",
          content:
            "Your feedback has been submitted successfully. Thank you for your feedback.",
        });
      }
    }
  }

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
          id="feedback-q1"
          label={`1. ${QUESTION_SENTENCES.whatsGreat}`}
          placeholder="Please describe what you like about Winden."
          value={whatsGreat}
          onChange={(e) => setWhatsGreat(e.target.value)}
        />
        <Textarea
          id="feedback-q2"
          label={`2. ${QUESTION_SENTENCES.whatsUseful}`}
          placeholder="Please describe the key purposes you use Winden for (e.g., sending large video files to clients; sending text files between my devices)."
          value={whatsUseful}
          onChange={(e) => setWhatsUseful(e.target.value)}
        />
        <Textarea
          id="feedback-q3"
          label={`3. ${QUESTION_SENTENCES.whatsNotGreat}`}
          placeholder="Please describe any missing functionality that's important to you, or anything else you'd like to see improved."
          value={whatsNotGreat}
          onChange={(e) => setWhatsNotGreat(e.target.value)}
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
          value={rating}
          onChange={setRating}
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
          <Button color="yellow" onClick={handleSubmit}>
            Submit
          </Button>
        </Center>
        {error && "The form is empty. Please fill out the form."}
      </Stack>
    </StaticPage>
  );
}
