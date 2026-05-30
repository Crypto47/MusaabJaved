import { Column, Row, Text, Heading, Icon, Grid } from "@once-ui-system/core";
import { seeker } from "@/resources";

// 2. Reusable Sub-component
const InfoSection = ({ title, items }: { title: string; items: Array<{ icon: string; title: string; desc: string }> }) => (
  <Column
    gap="12"
    padding="16"
    radius="m"
    background="surface"
    border="neutral-alpha-weak"
    data-border="conservative"
  >
    <Text variant="label-default-l" paddingY="8" weight="strong">
      {title}
    </Text>
    {items.map((item, index) => (
      <Row key={`${item.title}-${index}`} gap="12" vertical="center">
        <Icon name={item.icon} size="m" onBackground="neutral-weak" />
        <Column gap="4">
          <Text variant="label-default-s" weight="strong">
            {item.title}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak" style={{ opacity: 0.8 }}>
            {item.desc}
          </Text>
        </Column>
      </Row>
    ))}
  </Column>
);

export function Disclaimer() {
  const ui = seeker.ui?.disclaimer;

  return (
    <Column fillWidth gap="16">
      <Heading as="h2" variant="display-strong-s">{ui?.heading}</Heading>

      <Text variant="body-default-m" onBackground="neutral-weak">
        {ui?.lead}
      </Text>

      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        <InfoSection title={ui?.tipsTitle} items={ui?.tips} />
        <InfoSection title={ui?.vectorsTitle} items={ui?.vectors} />
      </Grid>

      <Row
        fillWidth padding="12" radius="m" border="neutral-medium" gap="12"
        vertical="center" style={{ opacity: 0.5 }} data-border="conservative"
      >
        {ui?.footerIcon && <Icon name={ui.footerIcon} size="s" onBackground="neutral-strong" />}
        <Text variant="label-default-s" onBackground="neutral-strong">
          {ui?.footerNotice}
        </Text>
      </Row>
    </Column>
  );
}
