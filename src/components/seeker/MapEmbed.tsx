import { Column, Row, Text, Heading, Button, Icon, type IconName } from "@once-ui-system/core";
import { seeker } from "@/resources";

interface MapEmbedProps {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface CoordDisplay {
  label: string;
  value: number;
}

interface ButtonConfig {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  arrowIcon?: boolean;
  prefixIcon?: IconName;
}

export function MapEmbed({ latitude, longitude, accuracy }: MapEmbedProps) {
  const accuracyInDegrees = accuracy / 111000;
  const delta = Math.min(Math.max(accuracyInDegrees * 1.5, 0.002), 0.1);

  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}&ll=${latitude},${longitude}&z=18`;
  const osmViewUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - delta
  },${latitude - delta},${longitude + delta},${latitude + delta}&layer=mapnik&marker=${latitude},${longitude}`;

  const ui = seeker.ui.results;

  const coords: CoordDisplay[] = [
    { label: ui.mapLatLabel, value: latitude },
    { label: ui.mapLonLabel, value: longitude },
  ];

  const buttons: ButtonConfig[] = [
    { label: ui.mapButtons.google, href: googleMapsUrl, variant: "primary", arrowIcon: true, prefixIcon: "googlemaps" },
    { label: ui.mapButtons.osm, href: osmViewUrl, variant: "secondary", arrowIcon: false, prefixIcon: "openstreetmap" },
  ];

  return (
    <Column fillWidth gap="16">
      <Heading as="h2" variant="display-strong-s">
        {ui.mapHeading}
      </Heading>
      <Column
        fillWidth
        gap="12"
        radius="m"
        border="neutral-alpha-weak"
        background="surface"
        overflow="hidden"
        data-border="conservative"
      >
        <iframe
          src={osmEmbedUrl}
          style={{ width: "100%", height: "320px", border: "none", display: "block" }}
          title={ui.mapHeading}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <Row
          fillWidth
          paddingX="12"
          paddingY="12"
          gap="12"
          vertical="center"
          wrap
          style={{ borderTop: "1px solid var(--neutral-alpha-weak)" }}
        >
          {coords.map((coord) => (
            <Row key={coord.label} gap="8" vertical="center" flex={1}>
              <Icon name="globe" size="xs" onBackground="neutral-weak" />
              <Text variant="label-default-xs" onBackground="neutral-weak" style={{ opacity: 0.6 }}>
                {coord.label}
              </Text>
              <Text
                variant="body-default-s"
                onBackground="neutral-strong"
                style={{ fontFamily: "var(--font-code)" }}
              >
                {coord.value.toFixed(8)}
              </Text>
            </Row>
          ))}
          <Column s={{ hide: true }}>
            <Text
              variant="label-default-xs"
              onBackground="neutral-weak"
            >
              {ui.mapAccuracyPrefix}{accuracy.toFixed(0)} m
            </Text>
          </Column>
        </Row>
      </Column>
      <Row fillWidth gap="8" data-border="conservative">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            variant={btn.variant}
            size="m"
            prefixIcon={btn.prefixIcon}
            arrowIcon={btn.arrowIcon}
            fillWidth
          >
            {btn.label}
          </Button>
        ))}
      </Row>
    </Column>
  );
}
