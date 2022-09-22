import React, { useState } from "react";

export const CodeInputContext =
  React.createContext<{
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    submitting: boolean;
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    showError: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
    touched: boolean;
    setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  } | null>(null);

type Props = React.PropsWithChildren<{}>;

export default function CodeInputProvider(props: Props) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [touched, setTouched] = useState(false);

  return (
    <CodeInputContext.Provider
      value={{
        value,
        setValue,
        submitting,
        setSubmitting,
        showError,
        setShowError,
        touched,
        setTouched,
      }}
    >
      {props.children}
    </CodeInputContext.Provider>
  );
}
