import React from "react";
import { useWormhole } from "../hooks/useWormhole";
import { CodeInput } from "./CodeInput";

type Props = {};

export default function ReceivePage({}: Props) {
  const wormhole = useWormhole();

  return wormhole?.fileMeta ? (
    <div>
      <div>
        You will download {wormhole.fileMeta.name} which has{" "}
        {wormhole.fileMeta.size} bytes.
      </div>
      <div>
        <button onClick={() => wormhole.fileMeta?.accept()}>
          Accept and download
        </button>
      </div>
    </div>
  ) : (
    <div data-testid="receive-page-container">
      <h2>Receive files in real-time</h2>
      <h3>Always end-to-end encrypted.</h3>
      <CodeInput onSubmit={(code) => wormhole?.saveFile(code)} />
    </div>
  );
}
