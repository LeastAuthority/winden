import React, { useState } from "react";
import { Flash, FlashContext } from "../../hooks/useFlash";

type Props = React.PropsWithChildren<{}>;

export default function FlashProvider(props: Props) {
  const [flash, setFlash] = useState<Flash | null>(null);
  return (
    <FlashContext.Provider value={{ value: flash, set: setFlash }}>
      {props.children}
    </FlashContext.Provider>
  );
}
