import { Modal } from "@mantine/core";
import React from "react";
import { dismissError, selectErrorContent } from "../../errorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

type Props = React.PropsWithChildren<{}>;

export default function ErrorProvider(props: Props) {
  const content = useAppSelector(selectErrorContent);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal
        centered
        opened={Boolean(content)}
        onClose={() => dispatch(dismissError())}
        title={content?.title}
      >
        {content?.description}
      </Modal>
      {props.children}
    </>
  );
}
