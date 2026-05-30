"use client";

import { AutoScroll, Column, Text } from "@once-ui-system/core";
import Image from "next/image";

interface Client {
  name: string;
  logo: string;
}

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  return (
    <Column fillWidth gap="16" paddingY="24">
      <Text variant="label-default-s" onBackground="neutral-weak" align="center">
        Clients I&apos;ve worked with
      </Text>
      <AutoScroll speed="slow">
        {clients.map((client, i) => (
          <Column
            key={i}
            horizontal="center"
            vertical="center"
            style={{ flexShrink: 0, width: "140px", height: "56px" }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={140}
              height={56}
              style={{ objectFit: "contain", opacity: 0.7 }}
            />
          </Column>
        ))}
      </AutoScroll>
    </Column>
  );
}
