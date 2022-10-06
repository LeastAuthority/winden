import about from "!raw-loader!./static/about.html";
import business from "!raw-loader!./static/business.html";
import faq from "!raw-loader!./static/faq.html";
import feedback from "!raw-loader!./static/feedback.html";
import privacy from "!raw-loader!./static/privacy.html";
import terms from "!raw-loader!./static/terms.html";
import { TypographyStylesProvider } from "@mantine/core";
import React from "react";
import Content from "../Content";

const pages = {
  about,
  business,
  faq,
  feedback,
  privacy,
  terms,
};

type Props = {
  page: keyof typeof pages;
};

export default function StaticPage(props: Props) {
  return (
    <Content>
      <TypographyStylesProvider>
        <div
          className="static-content"
          dangerouslySetInnerHTML={{ __html: pages[props.page] }}
        ></div>
      </TypographyStylesProvider>
    </Content>
  );
}
