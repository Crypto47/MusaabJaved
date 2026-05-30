import { Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import type { Testimonial } from "@/utils/utils";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  if (testimonials.length === 0) return null;

  return (
    <Column fillWidth gap="32">
      <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
        Don't just take my word for it
      </Heading>

      <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16">
        {testimonials.map((t) => (
          <Column
            key={t.name}
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            padding="20"
            gap="12"
            style={{ flex: 1 }}
          >
            <Text
              variant="heading-strong-l"
              onBackground="accent-medium"
              style={{ lineHeight: 1 }}
            >
              "
            </Text>
            <Text
              variant="body-default-xs"
              onBackground="neutral-medium"
              style={{ flex: 1, whiteSpace: "pre-line" }}
            >
              {t.quote}
            </Text>
            <Row gap="12" vertical="center">
              {t.image && (
                <img
                  src={t.image}
                  alt={t.name}
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}
              <Column gap="2">
                <Text variant="label-strong-s">{t.name}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {t.role} · {t.company}
                </Text>
              </Column>
            </Row>
          </Column>
        ))}
      </Grid>
    </Column>
  );
}
