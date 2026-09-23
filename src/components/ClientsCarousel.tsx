"use client";

import { AutoScroll, Column, Text } from "@once-ui-system/core";
import Image from "next/image";
import styles from "./ClientsCarousel.module.scss";

interface Client {
  name: string;
  logo: string;
}

interface ClientsCarouselProps {
  clients: Client[];
}

/**
 * The logos arrive in whatever colour the client shipped. Dark marks vanish on
 * the dark theme and white marks vanish on the light one, so each is tagged by
 * file name with the theme it needs inverting on. Excelr8 is a black tile with
 * white glyphs and Zippit is a full-colour badge; both read on either theme, so
 * they are left alone.
 */
const INVERT_ON_DARK = new Set(["bluonx"]);
const INVERT_ON_LIGHT = new Set(["like-a-human"]);

const logoClass = (logo: string) => {
  const slug = logo.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  if (INVERT_ON_DARK.has(slug)) return `${styles.logo} ${styles.invertOnDark}`;
  if (INVERT_ON_LIGHT.has(slug)) return `${styles.logo} ${styles.invertOnLight}`;
  return styles.logo;
};

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
              className={logoClass(client.logo)}
            />
          </Column>
        ))}
      </AutoScroll>
    </Column>
  );
}
