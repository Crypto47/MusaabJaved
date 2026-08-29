import { process } from "@/resources";
import { Card, Column, Grid, Heading, Text } from "@once-ui-system/core";

export const ProcessSection = () => {
  return (
    <Column fillWidth gap="16" paddingX="l">
      <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
        How I Work
      </Heading>
      <Text align="center" variant="body-default-m" onBackground="neutral-weak" wrap="balance">
        From discovery to a monitored production system — the same 7 steps every time.
      </Text>
      <Grid
        columns="4"
        m={{ columns: "2" }}
        s={{ columns: "1" }}
        fillWidth
        gap="16"
        paddingTop="16"
      >
        {process.map((item) => (
          <Card
            key={item.step}
            direction="column"
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            padding="20"
            gap="8"
          >
            <Text variant="display-strong-xs" onBackground="brand-weak">
              {item.step}
            </Text>
            <Heading as="h3" variant="heading-strong-s">
              {item.title}
            </Heading>
            <Text variant="body-default-xs" onBackground="neutral-medium">
              {item.description}
            </Text>
          </Card>
        ))}
      </Grid>
    </Column>
  );
};
