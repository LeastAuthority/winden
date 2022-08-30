import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CodeInputContent } from "../app/components/CodeInput";

export default {
  title: "CodeInput",
  component: CodeInputContent,
} as ComponentMeta<typeof CodeInputContent>;

const Template: ComponentStory<typeof CodeInputContent> = (args) => (
  <CodeInputContent {...args} />
);

export const Blank = Template.bind({});
Blank.args = {
  code: "",
  codeSuggestion: "",
  focused: false,
  touched: false,
  showError: false,
  submitting: false,
  errorType: null,
  onChange: () => {
    console.log("onChange");
  },
  onFocus: () => {
    console.log("onFocus");
  },
  onBlur: () => {
    console.log("onBlur");
  },
  onSubmit: () => {
    console.log("onSubmit");
  },
};

export const Suggestion = Template.bind({});
Suggestion.args = {
  ...Blank.args,
  code: "7-gui",
  codeSuggestion: "guitarist",
  focused: true,
  touched: true,
};

export const ValidFormat = Template.bind({});
ValidFormat.args = {
  ...Blank.args,
  code: "7-guitarist-revenge",
  touched: true,
};

export const InvalidFormat = Template.bind({});
InvalidFormat.args = {
  ...Blank.args,
  code: "asdf",
  touched: true,
  showError: true,
  errorType: "INVALID_FORMAT",
};

export const InvalidFirstWord = Template.bind({});
InvalidFirstWord.args = {
  ...Blank.args,
  code: "7-gitarist-revenge",
  touched: true,
  showError: true,
  errorType: "INVALID_FIRST_WORD",
};

export const InvalidSecondWord = Template.bind({});
InvalidSecondWord.args = {
  ...Blank.args,
  code: "7-guitarist-revege",
  touched: true,
  showError: true,
  errorType: "INVALID_SECOND_WORD",
};
