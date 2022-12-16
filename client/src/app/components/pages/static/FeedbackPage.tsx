import React from "react";
import { ExternalLink } from "tabler-icons-react";
import StaticPage from "../StaticPage";

type Props = {};

export default function FeedbackPage({}: Props) {
  return (
    <StaticPage>
      <h1>Feedback</h1>
      <p>Loving Winden? Meh? Kind of?</p>
      <p>
        Regardless, we would <b>enjoy hearing from you</b>!
      </p>
      <p>
        Please{" "}
        <a
          href="javascript:void(0);"
          onClick={() =>
            window.open(
              "https://leastauthority.com/winden-feedback/",
              "feedback",
              "left=100,top=100,width=640,height=480"
            )
          }
        >
          fill out this form
          <ExternalLink size={16} />
        </a>{" "}
        or send us an email at{" "}
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
    </StaticPage>
  );
}
