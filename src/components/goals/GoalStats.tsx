import type React from "react";
import { Row, Text, Flex } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import type { Goal } from "@/app/api/goals/route";

interface GoalStatsProps {
  goals: Goal[];
}

export const GoalStats: React.FC<GoalStatsProps> = ({ goals }) => {
  const total = goals.length;
  const accomplished = goals.filter((g) => !!g.accomplished_at).length;

  const lastUpdated = [...goals].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )[0];

  return (
    <Flex xs={{ horizontal: "center" }} paddingX="2" paddingTop="12" fillWidth horizontal="between" vertical="end" gap="8" style={{ flexWrap: "wrap" }}>
      <Text variant="label-default-s" onBackground="neutral-weak">
        {lastUpdated ? `Last updated ${formatDate(lastUpdated.updated_at, true)}` : ""}
      </Text>
      <Row gap="8" vertical="center">
        <Text variant="label-default-s" onBackground="neutral-weak">
          {accomplished} of {total} goals achieved
        </Text>
      </Row>
    </Flex>
  );
};
