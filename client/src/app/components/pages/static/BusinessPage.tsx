import React from "react";
import StaticPage from "../StaticPage";

type Props = {};

export default function BusinessPage({}: Props) {
  return (
    <StaticPage>
      <h1>For Business</h1>
      <p>
        <b>
          Interested in bringing Winden’s real-time connections to your
          organization?
        </b>
      </p>
      <p>
        Winden can be used for easy and secure file transfers within your
        organization, or externally with other organizations, customers, or
        other relations.
      </p>
      <p>
        The technology behind Winden can also be used to easily and securely
        introduce devices to one another, without needing to create sign-ups or
        exchange identity information.
      </p>
      <p>
        If you would like to know about everything the technology is capable of,
        please contact us at{" "}
        <a href="mailto:business@winden.app">business@winden.app</a>.
      </p>
    </StaticPage>
  );
}
