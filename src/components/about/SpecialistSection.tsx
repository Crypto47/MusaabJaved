import { person } from "@/resources";
import type { About } from "@/types";
import { Column, Grid, Media, Row, Text } from "@once-ui-system/core";

interface SpecialistSectionProps {
  data: About["specialist"];
}

export const SpecialistSection = ({ data }: SpecialistSectionProps) => {
  return (
    <Row fillWidth gap="24" s={{ direction: "column" }}>
      <Column flex={4} gap="12">
        <Media src={data.image.src} alt={data.image.alt} radius="l" aspectRatio="4/5" />
        <Column background="surface" border="neutral-alpha-weak" radius="m" padding="12" gap="2">
          <Text variant="label-strong-s">{person.name}</Text>
          <Text variant="label-default-s" onBackground="accent-weak">
            {person.role}
          </Text>
        </Column>
      </Column>
      <Column flex={8} gap="16">
        <Text variant="body-default-m">{data.description}</Text>
        <Grid columns="2" s={{ columns: "1" }} fillWidth gap="12">
          {data.stats.map((stat) => (
            <Column
              key={stat.value}
              background="surface"
              border="neutral-alpha-weak"
              radius="m"
              padding="16"
              gap="4"
            >
              <Text variant="heading-strong-s">{stat.value}</Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                {stat.label}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>
    </Row>
  );
};
