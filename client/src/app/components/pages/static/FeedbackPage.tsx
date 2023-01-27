import {
  Button,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import React from "react";
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
  const flash = useFlash();
  const navigate = useNavigate();

  const labelProps = {
    size: "md",
    style: {
      fontWeight: 600,
    },
  };

  const errorProps = {
    style: {
      fontSize: 12.8,
    },
  };

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
        <Formik
          initialValues={{
            rating: "",
            whatsGreat: "",
            whatsUseful: "",
            whatsNotGreat: "",
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (
              !values.rating &&
              !values.whatsGreat &&
              !values.whatsNotGreat &&
              !values.whatsUseful
            ) {
              errors.all = "The form is empty. Please fill out the form.";
            }
            if (values.whatsGreat.length > 2000) {
              errors.whatsGreat = "Content should not exceed 2000 characters.";
            }
            if (values.whatsUseful.length > 2000) {
              errors.whatsUseful = "Content should not exceed 2000 characters.";
            }
            if (values.whatsNotGreat.length > 2000) {
              errors.whatsNotGreat =
                "Content should not exceed 2000 characters.";
            }
            return errors;
          }}
          onSubmit={async (values, formik) => {
            const response = await submitFeedback(
              parseInt(values.rating),
              values.whatsGreat,
              values.whatsUseful,
              values.whatsNotGreat
            );
            if (response.ok) {
              navigate("/s");
              flash?.set({
                title: "Feedback sent",
                content:
                  "Your feedback has been submitted successfully. Thank you for your feedback.",
              });
            } else {
              formik.setFieldError(
                "all",
                "Something went wrong. Try again later."
              );
            }
          }}
        >
          {(formik) => (
            <Form>
              <Stack spacing="lg">
                <Textarea
                  label={`1. ${QUESTION_SENTENCES.whatsGreat}`}
                  labelProps={labelProps}
                  errorProps={errorProps}
                  minRows={5}
                  maxRows={15}
                  autosize
                  placeholder="Please describe what you like about Winden."
                  name="whatsGreat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whatsGreat}
                  error={formik.errors.whatsGreat}
                />
                <Textarea
                  label={`2. ${QUESTION_SENTENCES.whatsUseful}`}
                  labelProps={labelProps}
                  errorProps={errorProps}
                  minRows={5}
                  maxRows={15}
                  autosize
                  placeholder="Please describe the key purposes you use Winden for (e.g., sending large video files to clients; sending text files between my devices)."
                  name="whatsUseful"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whatsUseful}
                  error={formik.errors.whatsUseful}
                />
                <Textarea
                  label={`3. ${QUESTION_SENTENCES.whatsNotGreat}`}
                  labelProps={labelProps}
                  errorProps={errorProps}
                  minRows={5}
                  maxRows={15}
                  autosize
                  placeholder="Please describe any missing functionality that's important to you, or anything else you'd like to see improved."
                  name="whatsNotGreat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.whatsNotGreat}
                  error={formik.errors.whatsNotGreat}
                />
                <Group spacing={0}>
                  <Text weight={600} size="md">
                    4. On a scale of 1-5, how likely are you to recommend Winden
                    to a friend or colleague?&nbsp;
                  </Text>
                  <Text color="dimmed">
                    (1 = Definitely not, 5 = Yes, I will do it now.)
                  </Text>
                </Group>
                <SegmentedControl
                  color="gray"
                  name="rating"
                  onChange={(v) => {
                    formik.setFieldValue("rating", v);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                  data={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                  ]}
                  fullWidth
                />
                <Stack align="center" spacing="xs">
                  <Button
                    color="yellow"
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={!formik.dirty || !formik.isValid}
                  >
                    Submit
                  </Button>
                  {(formik.errors as Record<string, string>).all && (
                    <Text color="red" size="sm">
                      {(formik.errors as Record<string, string>).all}
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </StaticPage>
  );
}
