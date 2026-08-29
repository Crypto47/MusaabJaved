import { contact } from "@/resources";
import {
  Background,
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core";
import type { SpacingToken, opacity } from "@once-ui-system/core";

export const ContactSection = () => {
  if (!contact.display) return null;

  return (
    <Column
      id="contact"
      overflow="hidden"
      position="relative"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
        top="0"
        position="absolute"
        mask={{ x: 50, y: 0 }}
        gradient={{
          display: true,
          opacity: 60 as opacity,
          x: 50,
          y: 0,
          width: 100,
          height: 50,
          tilt: 0,
          colorStart: "brand-background-weak",
          colorEnd: "static-transparent",
        }}
        dots={{
          display: true,
          opacity: 20 as opacity,
          size: "2" as SpacingToken,
          color: "accent-on-background-weak",
        }}
      />
      <Column maxWidth="m" horizontal="center" gap="12" position="relative" zIndex={1}>
        <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
          {contact.title}
        </Heading>
        <Text align="center" variant="body-default-m" onBackground="neutral-weak" wrap="balance">
          {contact.description}
        </Text>

        <Grid
          columns="3"
          m={{ columns: "2" }}
          s={{ columns: "1" }}
          fillWidth
          gap="12"
          paddingTop="24"
        >
          {contact.channels.map((channel) => (
            <Card
              key={channel.name}
              href={channel.link}
              direction="column"
              gap="8"
              padding="20"
              background="page"
              border="neutral-alpha-weak"
              radius="m"
              horizontal="center"
            >
              <Icon name={channel.icon} size="m" onBackground="accent-weak" />
              <Text variant="label-strong-s">{channel.name}</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                {channel.value}
              </Text>
            </Card>
          ))}
        </Grid>

        <Column horizontal="center" gap="12" paddingTop="24">
          <Text variant="heading-strong-m" align="center">
            {contact.cta.heading}
          </Text>
          <Row gap="8" wrap horizontal="center">
            {contact.cta.actions.map((action) => (
              <Button
                key={action.label}
                prefixIcon={action.icon}
                variant={action.variant}
                size="m"
                href={action.href}
                label={action.label}
              />
            ))}
          </Row>
        </Column>
      </Column>
    </Column>
  );
};
