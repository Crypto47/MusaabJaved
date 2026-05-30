import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { getCurrentlyItems, type CurrentlyItem } from "@/utils/utils";

function CurrentlyCard({ item }: { item: CurrentlyItem }) {
  return (
    <div
      style={{
        width: "140px",
        aspectRatio: "2/3",
        borderRadius: "var(--radius-l)",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        background: "var(--neutral-alpha-weak)",
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
        }}
      >
        <Text variant="label-strong-xs" style={{ color: "#fff", display: "block" }}>
          {item.title}
        </Text>
        {item.category && (
          <Text variant="label-default-xs" style={{ color: "rgba(255,255,255,0.6)", display: "block" }}>
            {item.category}
          </Text>
        )}
      </div>
    </div>
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
            {games.map((item) => (
              <CurrentlyCard key={item.title} item={item} />
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
            {books.map((item) => (
              <CurrentlyCard key={item.title} item={item} />
            ))}
          </Row>
        </Column>
      )}
    </Column>
  );
}
