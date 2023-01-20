import { Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { isValidBrowser } from "../util/isValidBrowser";
import Link from "./Link";

type Props = React.PropsWithChildren<{}>;

export default function BrowserValidator(props: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const isValid = isValidBrowser();
    if (!isValid) {
      setOpened(true);
    }
  }, []);

  return (
    <>
      {
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Browser not supported"
        >
          <Text>
            Please use a{" "}
            <Link to="/faq#supported-browsers" onClick={() => setOpened(false)}>
              browser we do support.
            </Link>
          </Text>
        </Modal>
      }
      {props.children}
    </>
  );
}
