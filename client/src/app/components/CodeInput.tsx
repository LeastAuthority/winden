import React, { useRef, useState } from "react";
import { applyCodeSuggestion } from "../../util/applyCodeSuggestion";
import { getCodeSuggestion } from "../../util/getCodeSuggestion";
import { Popover } from "./Popover";

type Props = {};

export function CodeInput({}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState("");
  const codeSuggestion = getCodeSuggestion(code);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hasSpace = e.target.value.includes(" ");
    if (hasSpace && codeSuggestion) {
      setCode(applyCodeSuggestion(e.target.value, codeSuggestion));
    } else if (!hasSpace) {
      setCode(e.target.value);
    }
  }

  return (
    <div>
      <input
        data-testid="code-input"
        ref={inputRef}
        type="text"
        value={code}
        onChange={handleChange}
        placeholder="Enter code here"
      />
      <Popover elementRef={inputRef} active={!!codeSuggestion}>
        <div>
          <span>{codeSuggestion}</span>
          <span>Press space to complete</span>
        </div>
      </Popover>
    </div>
  );
}
