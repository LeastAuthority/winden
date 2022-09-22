import { Text, Title } from "@mantine/core";
import React from "react";
import Content from "../Content";

type Props = {};

export default function FaqPage({}: Props) {
  return (
    <Content>
      <Title order={1}>Frequently Asked Questions</Title>
      <Text component="p" weight="bold">
        Ut rerum animi et vel?
      </Text>
      <Text component="p">
        Ea consequatur qui ea aut eum aut accusantium blanditiis. Nisi
        consequatur voluptatibus cumque et.
      </Text>

      <Text component="p" weight="bold">
        Commodi ipsa aut eius est ut aut?
      </Text>
      <Text component="p">
        Omnis dolor aut quia aut quae. Dolorum non nemo repudiandae autem iusto
        expedita sed. Beatae quo velit inventore voluptas fugit impedit. Odio
        quisquam pariatur ullam veniam.
      </Text>

      <Text component="p" weight="bold">
        Ullam mollitia error rem quis similique molestiae ut necessitatibus?
      </Text>
      <Text component="p">
        Assumenda nisi quia et reprehenderit vero tempore voluptatem quae. Ipsa
        neque quidem et itaque aliquam. Dolores neque blanditiis dolorem et
        veritatis reiciendis dicta. Et soluta eaque eos.
      </Text>

      <Text component="p" weight="bold">
        Sed accusantium sunt reiciendis esse veritatis earum?
      </Text>
      <Text component="p">
        Sunt odit id magnam repudiandae aut dolor. Quas molestiae dolor voluptas
        fuga magni. Pariatur nostrum expedita voluptas dolorem quis sed rem est.
        Commodi sequi architecto ullam animi minima voluptatibus aut.
      </Text>

      <Text component="p" weight="bold">
        Qui deleniti temporibus corrupti nulla?
      </Text>
      <Text component="p">
        Corporis sunt maiores aut iure quasi. Nesciunt quia qui in optio.
      </Text>
    </Content>
  );
}
