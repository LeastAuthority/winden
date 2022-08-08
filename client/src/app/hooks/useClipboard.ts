import { useState } from "react";

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCopyResult = (value: boolean) => {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    setCopyTimeout(setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = (valueToCopy: any) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => setError(err));
    } else {
      // workaround for safari/webkit browsers which don't have clipboard
      const textArea = document.createElement("textarea");
      textArea.value = valueToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      handleCopyResult(true);
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
  };

  return { copy, reset, error, copied };
}
