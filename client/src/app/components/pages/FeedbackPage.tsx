import React from "react";
import Content from "../Content";

type Props = {};

export default function FeedbackPage({}: Props) {
  return (
    <Content>
      <h1>Feedback</h1>
      <p>Loving Winden? Meh? Kind of?</p>
      <p>
        Regardless, we would <b>enjoy hearing from you</b>!
      </p>
      <p>
        Please send us an email at{" "}
        <a href="mailto:feedback@winden.app">feedback@winden.app</a> with any
        thoughts you may have about using Winden.
      </p>
      <p>For example:</p>
      <ul>
        <li>What’s great?</li>
        <li>What do you find it useful for?</li>
        <li>What’s missing?</li>
      </ul>
      <p>Your feedback helps us make Winden the best it can be.</p>
    </Content>
  );
}
