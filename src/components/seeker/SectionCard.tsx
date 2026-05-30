"use client";

import type { IconName } from "@/resources/icons";
import { Badge, Column, Icon, Row, Text } from "@once-ui-system/core";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  tag?: {
    label: string;
    variant: "neutral" | "warning" | "danger" | "success";
  };
  icon?: IconName;}

export function SectionCard({
  title,
  children,
  tag,
  icon,
}: SectionCardProps) {
  return (
    <Column
      fillWidth
      gap="12"
      padding="16"
      radius="m"
      border="neutral-alpha-weak"
      background="surface"
      data-border="conservative"
    >
      <Row vertical="start" horizontal="between">
        <Row vertical="center" gap="4">
          {icon && (
            <Icon name={icon} size="l" onBackground="neutral-strong" marginRight="4" />
          )}
          <Text
            paddingY="8"
            variant="label-default-l"
            weight="strong"
          >
            {title}
          </Text>
        </Row>
        {tag && (
          <Badge
            paddingX="8"
            paddingY="2"
            radius="xs"
            background={`${tag.variant}-strong`}
            border={`${tag.variant}-alpha-medium`}
          >
            <Text
              variant="label-default-xs"
              onBackground={`${tag.variant}-medium`}
            >
              {tag.label}
            </Text>
          </Badge>
        )}
      </Row>
      <Column fillWidth gap="12">
        {children}
      </Column>
    </Column>
  );
}
