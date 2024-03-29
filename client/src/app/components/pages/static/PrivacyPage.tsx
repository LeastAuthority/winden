import { Anchor } from "@mantine/core";
import React from "react";
import { ExternalLink } from "tabler-icons-react";
import Link from "../../Link";
import StaticPage from "../StaticPage";

type Props = {};

export default function PrivacyPage({}: Props) {
  return (
    <StaticPage>
      <h1>Privacy Policy</h1>
      <h2>Who we are</h2>
      <p>
        Winden is operated by Least Authority TFA GmbH (‘Least Authority’, ‘we’,
        ‘us’), located at Thaerstraße 28a, 10249 Berlin in Germany.
      </p>
      <p>
        As a privacy-focused company we aim to know as little about you as
        needed for us to be able to effectively run this service. As such, we
        aim for this privacy policy to be both clear and short.
      </p>
      <p>
        Read more about us on{" "}
        <a href="https://leastauthority.com" rel="noopener noreferrer">
          leastauthority.com
          <ExternalLink size={16} />
        </a>
        .
      </p>
      <h2>What data we collect</h2>
      <h3>When visiting the website</h3>
      <p>
        Winden.app, the mailbox server used to establish a connection between
        the sender and receiver, and the transit relay server through which
        files are streamed, are currently hosted with OVH in the European Union.
      </p>
      <p>
        As with any online service, OVH has access to information typically sent
        from your browser when you make a ‘request’. Examples of such ‘requests’
        are visiting the Winden website, and sending/receiving files. This
        information is usually captured in server logs.
      </p>
      <p>Information that OVH could be collecting is:</p>
      <ul>
        <li>IP address</li>
        <li>Time and date of request</li>
        <li>Browser/user agent (version and operating system)</li>
        <li>
          Referrer URL (the page, from which this page was linked, including the
          search term, in case of a search engine)
        </li>
        <li>HTTP code</li>
      </ul>
      <p>
        We do not seek access to IP addresses, but are provided such access
        through our hosting provider’s control panel.
      </p>
      <p>
        Based on the above data, OVH automatically generates statistics about
        the usage of Winden.app.
      </p>
      <p>
        The legal basis for processing this data is our legitimate interest to
        ensure the functionality, the integrity and security of the website
        (Art. 6 para. 1 (f) GDPR).
      </p>
      <h3>When using the service</h3>
      <p>
        When you send/receive files, the above data collection by our hosting
        provider OVH applies because you use the Winden website for that. The
        legal basis for processing this data is our legitime interest in the
        functionality of our service (Art. 6 para. 1(f) GDPR).
      </p>
      <p>In addition:</p>
      <p>
        <b>
          Files that you send/receive using Winden are end-to-end encrypted.
          This means that we cannot read or open any file sent.{" "}
          <Anchor component={Link} to="/faq">
            Learn more.
          </Anchor>
        </b>
      </p>
      <p>
        <b>
          Files that you send/receive are streamed through our servers, and not
          stored on them. This is why both sender/receiver need to be online at
          the same time for the transfer to succeed.
        </b>
      </p>
      <h3>When reaching out to us by email</h3>
      <p>
        When you email us, we will inevitably collect the content of your email,
        your email address, the sender name, and anything else included in the
        email header.
      </p>
      <p>Emails are currently stored with our email provider Google.</p>
      <p>
        Data processing for the purpose of contacting us is based on your
        voluntarily given consent (Art. 6 para. 1 (a) GDPR), or - in case of
        general issues with our system - based on our legitime interest in the
        function of our service (Art. 6 para. 1 (f) GDPR).
      </p>
      <h3>When sending us feedback</h3>
      <p>
        When you send us feedback, we will inevitably collect the content of
        your message. As the feedback form is currently hosted at
        leastauthority.com, please read the{" "}
        <a
          href="https://leastauthority.com/privacy-policy/"
          rel="noopener noreferrer"
        >
          Least Authority privacy policy
          <ExternalLink size={16} />
        </a>{" "}
        for relevant information.
      </p>
      <p>
        Incoming feedback messages are currently stored with our email provider
        Google.
      </p>
      <p>
        Data processing for the purpose of contacting us is based on your
        voluntarily given consent (Art. 6 para. 1 (a) GDPR), or - in case of
        general issues with our system - based on our legitime interest in the
        function of our service (Art. 6 para. 1 (f) GDPR).
      </p>
      <h2>How we use this data / with whom do we share this data</h2>
      <p>
        We use statistical data to get a better understanding of how Winden is
        used. This helps us with tailoring the service.
      </p>
      <p>
        We use emails we receive to provide people with support requested or to
        improve our service based on feedback.
      </p>
      <p>
        We do <strong>not</strong> use this data to attempt to build a profile
        of individual users of our service.
      </p>
      <p>
        We do <strong>not</strong> share any of this data with anyone outside of
        Least Authority or, by default, the sub-processors mentioned above,
        unless required to do so by law or a court decision, and only to the
        extent permitted by data protection laws.
      </p>
      <p>
        However, we may publish aggregated (non-personal) statistics. This can,
        for example, be “There were X attempted file transfers on Winden last
        month.”
      </p>
      <h2>How long we keep this data</h2>
      <p>
        Our hosting provider OVH retains logs about access to our servers for an
        indefinite period of time.
      </p>
      <p>
        We keep emails received for as long as necessary to handle the issue.
        Six months after an issue has been handled or solved, we erase the
        email, unless keeping it is necessary for our legitimate business or
        operational interests.
      </p>
      <h2>Cookies / third party trackers</h2>
      <p>We don’t use any cookies or third party trackers on our website.</p>
      <h2>Data security</h2>
      <p>Files sent using Winden are end-to-end encrypted.</p>
      <p>
        Winden is built on Magic Wormhole, which uses the SPAKE2 cryptographic
        algorithm to establish a strong high-entropy shared key with a short
        low-entropy password (the code). All data is encrypted (with
        nacl/libsodium “secretbox”) using this key.
      </p>
      <p>
        For more details see our{" "}
        <Anchor component={Link} to="/faq#security-privacy">
          FAQ
        </Anchor>
        .
      </p>
      <h2>Exercising your rights</h2>
      <p>
        In line with the European Union’s General Data Protection Regulation,
        you have rights related to any personal data of yours that we process.
        As mentioned above, personal data we hold about individuals is limited
        to emails we receive from them, and automatically generated log data to
        which we have access, but which we cannot amend.
      </p>
      <p>You have the right to request from us at any time:</p>
      <ul>
        <li>
          Information as to whether or not personal data concerning you is being
          processed, and, where that is the case, access to this personal data;
        </li>
        <li>
          Rectification of inaccurate personal data concerning you, subject to
          relevant legal requirements;
        </li>
        <li>
          Erasure of personal data concerning you unless there are conflicting
          interests;
        </li>
        <li>
          Restriction of the processing of your personal data where one of the
          following applies:
        </li>
        <ul>
          <li>you contest the accuracy of your personal data,</li>
          <li>
            the processing is unlawful and you oppose the erasure of the
            personal data and requests the restriction of their use instead;
          </li>
          <li>
            we no longer need your personal data for the purposes of the
            processing, but they are required by you for the establishment,
            exercise or defense of legal claims, or
          </li>
          <li>
            you have objected to processing pursuant to Article 21 para. 1 GDPR
            pending the verification whether our legitimate grounds override
            those of you.
          </li>
        </ul>
        <li>
          To receive the personal data that you provided to us, in a structured,
          common and machine-readable format or requesting transmission to
          another controller. In this case, please contact us at{" "}
          <a href="mailto:privacy@leastauthority.com">
            privacy@leastauthority.com
          </a>{" "}
          and specify the information or processing activities to which your
          request relates. We will carefully consider your request and discuss
          with you how it can best fulfill it.
        </li>
      </ul>
      <p>
        You can revoke your consent once given to us at any time. As a result we
        stop the data processing based on this consent in the future.
      </p>
      <p>
        If we process your data pursuant to a legitimate interest or a
        legitimate interest of a third party , you can exercise your right to
        objections in accordance with Art. 21 GDPR.
      </p>
      <p>
        Please send any requests or questions related to exercising your rights
        to{" "}
        <a href="mailto:privacy@leastauthority.com">
          privacy@leastauthority.com
        </a>
        . As soon as we receive any request from you, we will process it. Please
        be aware that it might take some time for the process to be reflected
        across all our systems.
      </p>
      <p>
        You have the right to lodge a complaint with the competent data
        protection supervisory authority. The supervisory authority responsible
        for Berlin, Germany is: Berliner Beauftragte für Datenschutz und
        Informationsfreiheit, with its address Friedrichstr. 219, 10969 Berlin,
        Germany, and its phone number: +49 (0)30/138 89-0. Please find its
        website here:{" "}
        <a href="https://www.datenschutz-berlin.de" rel="noopener noreferrer">
          https://www.datenschutz-berlin.de
          <ExternalLink size={16} />
        </a>
        .
      </p>
      <h2>Changes to this privacy policy</h2>
      <p>This privacy policy was last updated on 6 October 2022.</p>
    </StaticPage>
  );
}
