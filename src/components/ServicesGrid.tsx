import { Card, Column, Grid, Heading, Icon, Text } from "@once-ui-system/core";
import { services } from "@/resources";

export function ServicesGrid() {
  return (
    <Column fillWidth gap="16">
      <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
        What I build
      </Heading>
      <Grid columns="2" s={{ columns: "1" }} fillWidth gap="16">
        {services.map((service) => (
          <Card
            key={service.title}
            fillWidth
            direction="column"
            border="neutral-alpha-weak"
            background="surface"
            radius="l"
            padding="24"
            gap="12"
          >
            <Icon name={service.icon as any} size="m" onBackground="accent-weak" />
            <Column gap="8">
              <Heading as="h3" variant="heading-strong-s">
                {service.title}
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-medium">
                {service.description}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
