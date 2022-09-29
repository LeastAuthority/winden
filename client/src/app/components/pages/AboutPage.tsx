import { Anchor, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Content from "../Content";

type Props = {};

export default function AboutPage({}: Props) {
  return (
    <Content>
      <h1>About</h1>
      <p>
        Winden is a free web application that allows secure, fast, and easy
        transfer files between devices in real-time. Winden is identity-free,
        meaning that senders and receivers don’t need to know each other’s
        identity to use it, or to reveal their identity to us. We do not require
        people to sign up or log in and we cannot access any files you send, as
        they are end-to-end encrypted. Files are never stored on our servers and
        transfers happen in real-time. While these aspects ensure the app is
        more private and secure, it means that both the sender and receiver need
        to be online at the same time.{" "}
        <b>
          Learn more about how Winden works in our{" "}
          <Anchor component={Link} to="/faq" color="tertiary">
            FAQ
          </Anchor>
          .
        </b>
      </p>
      <p>
        Based on the{" "}
        <a href="https://magic-wormhole.readthedocs.io/">
          Magic Wormhole protocol
        </a>
        , Winden was developed to scale the protocol without compromising its
        security and make it ready for web-usage. Part of this work was funded
        by the European Union’s{" "}
        <a href="https://www.ngi.eu/">Next Generation Internet</a> program
        (NGI_Trust).
      </p>
      <p>
        If you have any questions about Winden, please get in touch at{" "}
        <a href="mailto:contact@winden.app">contact@winden.app</a>.
      </p>
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
        <a href="https://leastauthority.com">leastauthority.com</a>.
      </p>
      <br />
      <Group spacing="xl">
        <img height={50} src="/la-logo.svg" />
        <img height={50} src="/EU-Emblem.png" />
        <img height={50} src="/NGI-TRUST_rgb.png" />
      </Group>
    </Content>
  );
}
