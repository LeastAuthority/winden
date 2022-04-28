import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function SendPage({}: Props) {
  const [sending, setSending] = useState(false);
  const file = useRef<File | null>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    file.current = e.target.files?.item(0) || null;
    setSending(true);
  }

  function handleCancel() {
    file.current = null;
    setSending(false);
  }

  return (
    <div data-testid="send-page-container">
      SendPage
      {sending ? (
        <div data-testid="send-page-code-section">
          <h3>send this code</h3>
          <button data-testid="send-page-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div data-testid="send-page-upload-section">
          upload file
          <input
            data-testid="upload-file-input"
            type="file"
            onChange={handleUpload}
          />
        </div>
      )}
      <div>
        <Link data-testid="go-to-receive-page" to="/r">
          Receive
        </Link>
      </div>
    </div>
  );
}
