import { Anchor } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import Content from "../Content";

type Props = {};

export default function FaqPage({}: Props) {
  return (
    <Content>
      <h1>Frequently Asked Questions</h1>
      <h3>General</h3>

      <h4>What makes Winden different?</h4>

      <p>
        With Winden you can send files by creating a live connection (a
        &ldquo;wormhole&rdquo;) between you and the recipient.
      </p>
      <p>
        This means that you{" "}
        <em>
          <b>both</b> need to be online at the same time
        </em>{" "}
        for the transfer to complete.
      </p>
      <p>
        It also means that <em>we never store your files on our servers</em>.
        The file stays on your device, and only passes through our servers when
        the recipient is downloading the file. As files are end-to-end encrypted
        we cannot read them, and since they are never stored on our servers you
        don&rsquo;t have to worry about files lingering in &lsquo;the
        cloud&rsquo;.
      </p>
      <p>
        To send someone a file, Winden creates a one-time link and a human
        pronounceable code; you can use either by sharing itshare with the
        recipient. The link/code &lsquo;expires&rsquo; the moment the recipient
        opens it on Winden.app, or when you close the browser tab.
      </p>

      <h4>What does it mean that Winden is &lsquo;in beta&rsquo;?</h4>
      <p>
        It means that we are still making many improvements and that the tool
        may experience unexpected issues. It also means that we are hoping to
        use this moment to learn from &lsquo;real people&rsquo; (like you)
        trying out the tool and sharing your experience with us.
      </p>
      <p>Some known limitations:</p>
      <ul>
        <li>
          Single files: It is currently only possible to send one file at a
          time.
        </li>
        <li>
          File size limits: In this initial stage, it is only possible to send
          files of up to 200 MB. When sending files to mobile devices, this
          number may be smaller than 100 MB.
        </li>
        <li>
          Cancellation: Canceling a transfer may lead to the application getting
          stuck during the transfer, or not both sides being informed of the
          cancellation. If the sender presses Cancel while the transfer is
          ongoing, it is possible for the receiver to already have a portion of
          the file.
        </li>
        <li>
          Error messages: We are not always able to determine the exact reason
          for an error occurring and therefore not able to provide the exact
          troubleshooting steps. For example, it is difficult to know whether an
          error occurred due to a network interruption or due to a cancellation.
        </li>
        <li>
          <a id="browser">Browsers</a>: Firefox on iOS and Safari on iOS (before
          14.4) are currently not supported. Please use a different browser.
        </li>
        <li>
          Google Drive on Android: It is currently not always possible to select
          files to send from Google Drive on Android.
        </li>
        <li>
          Speed: Transfers are currently slower than they should be. We&rsquo;re
          working to improve their speed.
        </li>
      </ul>

      <h4>What does Winden cost?</h4>
      <p>You can use Winden for free.</p>
      <h4>What is your business model?</h4>
      <p>
        We previously received generous support from the European Union&rsquo;s
        Next Generation Internet fund to build this as a privacy-preserving
        technology (see{" "}
        <Anchor component={Link} to="/about" color="tertiary">
          About
        </Anchor>
        ). We are currently exploring the best-suited privacy-respecting
        business model. We are offering consulting and customization services
        for businesses, and in the future we may offer premium apps, features,
        or performance at extra cost, aside from the freely accessible version.
      </p>

      <h3>Getting Started</h3>

      <h4>How can I send someone a file?</h4>
      <ol>
        <li>
          <b>Select a file</b>
          <br />
          Select a file by clicking the &lsquo;+ Select&rsquo; button or by
          dragging a file from your file explorer to the drag &amp; drop zone.
        </li>
        <br />
        <li>
          <b>Pass on the link/code</b>
          <br />
          The application will generate and display a link for you. <br />
          This link contains the one-time code (for example,
          7-guitarist-revenge) needed to receive the file.
          <br />
          <br />
          For ease of use you can copy the link using the Copy button. Pass on
          the link/code to the intended recipient verbally, digitally, or by any
          other means that you deem safe. You can either give the entire link or
          just the code and the website address (winden.app) to the recipient,
          so they can receive the file. Note that anyone with access to the link
          can receive your file.
        </li>
        <br />
        <li>
          <b>
            When the recipient opens the link and agrees to download the file,
            the transfer begins from your device
          </b>
          <br />
          Once they open the link/code and accept the download, the file will be
          sent from your device to theirs. Remember, both you and the recipient
          need to be connected to Winden at the same time for the transfer to
          complete.
        </li>
        <br />
        <li>
          <b>Done: the code is now no longer usable.</b>
          <br />
          No one else can receive the file with this code.
        </li>
      </ol>

      <h4>How can I securely share the link/code with someone?</h4>
      <p>
        We advise you to speak or use secure communication tools such as Signal
        for sharing the link/code.
      </p>

      <h4>How do I receive a file?</h4>
      <p>
        <em>If you received a link</em>
      </p>
      <ol>
        <li>
          <b>In your browser, open the one-time link that you received.</b>
        </li>
        <br />
        <li>
          <b>Download the file.</b>
          <br />
          If you are sure you would like to receive this file, press Download.
          It will be downloaded to your browser memory. If prompted at the end,
          you may need to click &lsquo;Save file&rsquo; or similar in your
          browser to write it to your device&rsquo;s memory.
        </li>
        <br />
        <li>
          <b>Done: the link is now no longer usable.</b>
          <br />
          No one else can receive the file with this link.
        </li>
      </ol>

      <p>
        <em>If you received a code</em>
      </p>
      <ol>
        <li>
          <b>On Winden.app, click on Receive in the top right corner.</b>
        </li>
        <br />
        <li>
          <b>
            Enter the code in the &lsquo;Enter code here&rsquo; field, and click
            Next.
          </b>
        </li>
        <br />
        <li>
          <b>Download the file</b>
          <br />
          If you are sure you would like to receive this file, press Download.
          It will be downloaded to your browser memory. If prompted at the end,
          you may need to click &lsquo;Save file&rsquo; or similar in your
          browser to write it to your device&rsquo;s memory.
        </li>
        <br />
        <li>
          <b>Done: the code is now no longer usable.</b>
          <br />
          No one else can receive the file with this code.
        </li>
      </ol>

      <h4>
        Why does the app need to stay open for both the sender and the receiver
        for the transfer to be completed?&nbsp;
      </h4>
      <p>
        With many other services, files are uploaded and stored on a central
        server.
      </p>

      <p>
        Winden, on the other hand, is meant for real-time file transfers. Files
        are sent from a sender&rsquo;s device to a recipient&rsquo;s device, and
        are only being streamed through our servers. (As files are end-to-end
        encrypted, we are unable to read them.)
      </p>

      <p>
        This means that if the sender is no longer connected, they can no longer
        offer the file for the receiver to get.
      </p>

      <h4>
        How can a simple code like 7-guitarist-revenge be secure? And why can a
        code only be used once?
      </h4>
      <p>
        There are 65,536 different combinations of the current wordlist used by
        Winden. Anyone who tries to guess the right word combination has a 1 in
        65,536 chance to guess right, which is a very small chance. If they
        guess wrong, the transfer is invalidated. This is tough luck for the
        sender, but also a safety feature: It prevents people from being able to
        keep guessing until they find the correct word combination.
      </p>

      <p>
        This also explains why codes are single use. Once a code is used
        &lsquo;successfully&rsquo; (sender and recipient connect) or
        &lsquo;unsuccessfully&rsquo; (a wrong code combination is guessed), the
        code is cleared for new usage. If the code would stay
        &lsquo;alive&rsquo; for other recipients, it would lose the security of
        being hard to guess.
      </p>

      <p>
        The{" "}
        <a href="https://magic-wormhole.readthedocs.io/en/latest/welcome.html#design">
          Magic Wormhole documentation
        </a>{" "}
        contains further details about the design and security of the protocol
        used by Winden.
      </p>

      <h3>Security &amp; privacy</h3>
      <h4>What makes Winden secure?</h4>
      <ul>
        <li>
          It is identity-less: There is no need to disclose identity information
          (such as name, email address or phone number) to be able to transfer
          files.
        </li>
        <li>
          It includes end-to-end encryption: Files are end-to-end encrypted and
          only the sender and recipient can read them. We cannot access the
          files.
        </li>
      </ul>

      <p>In more technical detail:</p>
      <ul>
        <li>
          Password authenticated key exchange: A 256-bit full-strength symmetric
          encryption key is derived from a short human pronounceable password
          using Diffie&ndash;Hellman key exchange algorithm to establish a
          shared "mailbox" between two parties.&nbsp;
        </li>
        <li>
          Encryption via the relay servers use Salsa20 stream cipher and
          Poly1305 MAC algorithm via the NaCl Secretbox abstraction.
        </li>
      </ul>

      <h4>What data do you collect?</h4>
      <p>
        Winden is designed for privacy. As such, we are actively focused on
        minimizing personal data that we collect. Specifically, we are not
        asking for and therefore do not know contact information (name, email
        address, phone number) about people who send/receive files. We do not
        store and cannot read files that are sent using Winden.
      </p>

      <p>
        Nevertheless, third parties such as our OVHcloud hosting provider
        collect some user access information like users&rsquo; IP address and
        user-agent. We have no control of that and seek no access to such
        information.
      </p>

      <p>
        For more details, see our{" "}
        <Anchor component={Link} to="/privacy" color="tertiary">
          privacy policy.
        </Anchor>
      </p>
      <h4>What other security concerns should I think about?</h4>
      <p>
        While we make every effort to ensure the security of our software, there
        are other security risks beyond our control.
      </p>

      <p>
        This is a web-based application. This means that we cannot{" "}
        <em>guarantee</em> that the code that we are making available is the
        same code that you receive in your browser, as it could be manipulated
        by others on the way. That&rsquo;s not us, this is any website or
        web-based application that you use. If you prefer code that you can
        verify and only need to <em>trust on first use</em>, you can rely on
        secure and open source downloadable applications, such as{" "}
        <a href="http://github.com/LeastAuthority/destiny">Destiny</a> (also
        developed by Least Authority) or the{" "}
        <a href="https://github.com/magic-wormhole/magic-wormhole">
          Python Magic Wormhole application
        </a>
        .
      </p>

      <p>
        Another thing to consider: If you copy the generated code or link, any
        application that can access your clipboard can read the code (and if
        malicious, download the files through the link/code you copied). Here
        too, it is good to know that this doesn&rsquo;t just apply to Winden,
        but to any piece of information you have on your clipboard in general.
      </p>

      <h3>Other</h3>
      <h4>Isn&rsquo;t this similar to Magic Wormhole?</h4>
      <p>
        It is! Winden uses the &ldquo;
        <a href="https://magic-wormhole.readthedocs.io/en/latest/">
          Magic Wormhole
        </a>
        &rdquo; protocol. Magic Wormhole is designed to be the easiest possible
        way to transfer files safely from one device to another. Winden
        implements a Magic Wormhole application for the web.
      </p>

      <h4>Is Winden open source?</h4>
      <p>
        It sure is. Here are the main GitHub repositories constituting the code
        used in this web app:
      </p>
      <ul>
        <li>
          <a href="http://github.com/LeastAuthority/winden">Winden</a> (web
          front-end)
        </li>
        <li>
          <a href="https://github.com/LeastAuthority/wormhole-william">
            Wormhole-william
          </a>{" "}
          (Go implementation, forked from{" "}
          <a href="https://github.com/psanford/wormhole-william">
            original code
          </a>
          )
        </li>
        <li>
          <a href="https://github.com/magic-wormhole">Magic-Wormhole</a>{" "}
          (protocol and servers)
        </li>
      </ul>

      <h4>Can I send multiple files at the same time?</h4>
      <p>Not yet -- but we would love to offer this in the future.</p>

      <p>
        For now, if you would like to send multiple files at the same time, you
        can compress them, for example, as a single ZIP file.
      </p>

      <h4>I like this tool, I want more!</h4>
      <p>
        If there are any other features you would like to see in Winden please
        send us your feedback.
      </p>

      <h4>I don&rsquo;t like this tool, where can I send my feedback?</h4>
      <p>
        Please tell us what you&rsquo;d like to be different, so we can improve.
      </p>

      <h4>I have another question / I need help</h4>
      <p>
        Please send us a message at{" "}
        <a href="mailto:contact@winden.app">contact@winden.app</a> and
        we&rsquo;ll do our best to help!
      </p>
    </Content>
  );
}
