import { process } from "@/resources";
import { Column, Heading, Icon, Row, Text } from "@once-ui-system/core";
import styles from "./ProcessSection.module.scss";

/**
 * "How I Work" as a snake path: four steps across, an elbow down, three back,
 * and a dashed loop from 07 back to 01. Layout and the scroll-drawn connector
 * live in ProcessSection.module.scss and assume the seven steps in content.tsx.
 * The markup stays an ordered list so assistive tech hears "list, 7 items";
 * the loop cell is decorative and hidden from it.
 */
export const ProcessSection = () => {
  return (
    <Column fillWidth gap="16" className={styles.root}>
      <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
        How I Work
      </Heading>
      <Text align="center" variant="body-default-m" onBackground="neutral-weak" wrap="balance">
        From discovery to a monitored production system — the same 7 steps every time.
      </Text>
      <Column as="ol" fillWidth paddingTop="16" className={styles.grid}>
        {process.map((item) => (
          <Column
            as="li"
            key={item.step}
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            padding="20"
            gap="8"
            className={styles.step}
          >
            <Row fillWidth horizontal="between" vertical="center">
              <Row horizontal="center" vertical="center" className={styles.icon} aria-hidden="true">
                {item.icon && <Icon name={item.icon} size="s" />}
              </Row>
              <Text variant="label-default-s" onBackground="brand-weak">
                {item.step}
              </Text>
            </Row>
            <Heading as="h3" variant="heading-strong-s">
              {item.title}
            </Heading>
            <Text variant="body-default-xs" onBackground="neutral-medium">
              {item.description}
            </Text>
          </Column>
        ))}
        <Column as="li" aria-hidden="true" className={styles.loop}>
          <Text variant="label-default-s" onBackground="brand-weak" className={styles.loopLabel}>
            Iterate
          </Text>
        </Column>
      </Column>
    </Column>
  );
};
