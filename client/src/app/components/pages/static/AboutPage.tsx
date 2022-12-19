import { Anchor } from "@mantine/core";
import React from "react";
import { ExternalLink } from "tabler-icons-react";
import Link from "../../Link";
import StaticPage from "../StaticPage";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <StaticPage>
      <h1>About</h1>
      <p>
        Winden is a free web application for secure, fast, and easy file
        transfers between devices in real-time. Winden is identity-free, meaning
        that senders and receivers don’t need to know each other’s identity to
        use it, or to reveal their identity to us.
      </p>
      <p>
        We do not require people to sign up or log in and we cannot access any
        files you send, as they are end-to-end encrypted. Files are never stored
        on our servers and transfers happen in real-time. While these aspects
        ensure the app is more private and secure, it means that both the sender
        and receiver need to be online at the same time.{" "}
        <b>
          Learn more about how Winden works in our{" "}
          <Anchor component={Link} to="/faq">
            FAQ
          </Anchor>
          .
        </b>
      </p>
      <p>
        Based on the{" "}
        <a
          href="https://magic-wormhole.readthedocs.io/"
          rel="noopener noreferrer"
        >
          Magic Wormhole protocol
          <ExternalLink size={16} />
        </a>
        , Winden was developed to scale the protocol without compromising its
        security and make it ready for web-usage. Part of this work was funded
        by the European Union’s{" "}
        <a href="https://www.ngi.eu/" rel="noopener noreferrer">
          Next Generation Internet
          <ExternalLink size={16} />
        </a>{" "}
        program (NGI_Trust).
      </p>
      <p>
        If you have any questions about Winden, please get in touch at{" "}
        <a href="mailto:contact@winden.app">contact@winden.app</a>.
      </p>
      <hr />
      <p>
        Winden is a product of Least Authority, based in Berlin, Germany. Least
        Authority creates freedom-compatible technologies, works on
        decentralized systems (Web3), and provides security consulting services
        for a wide range of blockchain ecosystems and Web3 projects.
      </p>
      <p>
        The name Least Authority is derived from “the principle of least
        authority” (PoLA) — also known in information security as “the principle
        of least privilege” or “the principle of minimal privilege” — a security
        best practice requiring system components to only have the privilege
        necessary to complete their intended function and not more.
      </p>
      <p>
        Interested in learning more about Least Authority? Visit{" "}
        <a href="https://leastauthority.com" rel="noopener noreferrer">
          leastauthority.com
          <ExternalLink size={16} />
        </a>
        .
      </p>
      <hr />
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <img height="50" src="/la-logo.svg" alt="Least Authority logo" />
        <img height="50" src="/EU-Emblem.png" alt="EU flag" />
        <img height="50" src="/NGI-TRUST_rgb.png" alt="NGI Trust logo" />
      </div>
    </StaticPage>
  );
}
