import { type CurrentlyItem, getCurrentlyItems } from "@/utils/utils";
import { Column, Flex, Heading, Row, Text } from "@once-ui-system/core";
import type { CSSProperties } from "react";
import styles from "./CurrentlySection.module.scss";

type Kind = "games" | "books";

const STATUS: Record<Kind, string> = {
  games: "Now playing",
  books: "Now reading",
};

/**
 * Poster card for one item. The outer Column floats and reveals on scroll; the
 * inner one tilts and lifts on hover. All motion lives in the module stylesheet.
 */
function CurrentlyCard({ item, kind, index }: { item: CurrentlyItem; kind: Kind; index: number }) {
  return (
    <Column className={styles.float} style={{ "--i": index } as CSSProperties}>
      <Column
        fillWidth
        radius="l"
        overflow="hidden"
        background="neutral-alpha-weak"
        className={styles.card}
      >
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className={styles.cover} />
        )}
        <Row
          position="absolute"
          top="8"
          left="8"
          vertical="center"
          gap="4"
          className={styles.chip}
          aria-hidden="true"
        >
          <Flex className={styles.dot} />
          <Text variant="label-default-xs" className={styles.chipText}>
            {STATUS[kind]}
          </Text>
        </Row>
        <Column
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          paddingX="12"
          paddingY="8"
          gap="4"
          className={styles.caption}
        >
          <Text variant="label-strong-xs" className={styles.title}>
            {item.title}
          </Text>
          {item.category && (
            <Text variant="label-default-xs" className={styles.category}>
              {item.category}
            </Text>
          )}
        </Column>
      </Column>
    </Column>
  );
}

interface CurrentlySectionProps {
  title: string;
}

export function CurrentlySection({ title }: CurrentlySectionProps) {
  const games = getCurrentlyItems("games");
  const books = getCurrentlyItems("books");

  if (games.length === 0 && books.length === 0) return null;

  return (
    <Column fillWidth gap="24" marginBottom="40">
      <Heading as="h2" variant="display-strong-s">
        {title}
      </Heading>

      {games.length > 0 && (
        <Column gap="12">
          <Text variant="label-strong-s" onBackground="neutral-weak">
            Playing
          </Text>
          <Row gap="12" wrap>
            {games.map((item, index) => (
              <CurrentlyCard key={item.title} item={item} kind="games" index={index} />
            ))}
          </Row>
        </Column>
      )}

      {books.length > 0 && (
        <Column gap="12">
          <Text variant="label-strong-s" onBackground="neutral-weak">
            Reading
          </Text>
          <Row gap="12" wrap>
            {books.map((item, index) => (
              <CurrentlyCard
                key={item.title}
                item={item}
                kind="books"
                index={games.length + index}
              />
            ))}
          </Row>
        </Column>
      )}
    </Column>
  );
}
