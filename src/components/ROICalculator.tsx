"use client";

import { useState } from "react";
import { Button, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";

const sliderStyle: React.CSSProperties = {
  width: "100%",
  accentColor: "var(--brand-solid-strong)",
  cursor: "pointer",
};

function SliderRow({
  label,
  value,
  min,
  max,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <Column gap="8" fillWidth>
      <Row fillWidth horizontal="between">
        <Text variant="label-default-s" onBackground="neutral-weak">{label}</Text>
        <Text variant="label-strong-s">{display}</Text>
      </Row>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={sliderStyle}
      />
    </Column>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <Column horizontal="center" gap="4">
      <Heading variant="display-strong-s" align="center">
        {value}
      </Heading>
      <Text variant="label-default-s" onBackground="neutral-weak" align="center">
        {label}
      </Text>
    </Column>
  );
}

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(3);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [salary, setSalary] = useState(3500);
  const [agencySpend, setAgencySpend] = useState(1000);

  const monthlyHours = Math.round(teamSize * hoursPerWeek * 4.33 * 0.65);
  const freeDays = Math.round(monthlyHours / 8);
  const hourlyRate = salary / 160;
  const laborSaved = Math.round(monthlyHours * hourlyRate);
  const agencySaved = Math.round(agencySpend * 0.8);
  const monthlySaved = laborSaved + agencySaved;
  const annualSaved = monthlySaved * 12;

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <Column fillWidth gap="40" horizontal="center">
      <Column horizontal="center" gap="8">
        <Heading as="h2" variant="display-strong-xs" align="center">
          What could you save?
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Adjust the sliders to estimate your savings with AI automation.
        </Text>
      </Column>

      <Grid columns="2" s={{ columns: "1" }} fillWidth gap="16">
        {/* Left panel — Time Savings */}
        <Column
          background="surface"
          border="neutral-alpha-weak"
          radius="l"
          padding="24"
          gap="24"
        >
          <Text variant="label-strong-s" onBackground="neutral-medium">
            TIME SAVINGS
          </Text>
          <Column gap="20">
            <SliderRow
              label="People in manual workflows"
              value={teamSize}
              min={1}
              max={20}
              display={`${teamSize} people`}
              onChange={setTeamSize}
            />
            <SliderRow
              label="Manual task hours / person / week"
              value={hoursPerWeek}
              min={1}
              max={40}
              display={`${hoursPerWeek} hrs`}
              onChange={setHoursPerWeek}
            />
          </Column>
          <Row gap="32" wrap>
            <StatTile value={`~${monthlyHours} hrs`} label="saved / month" />
            <StatTile value={`~${freeDays} days`} label="freed up" />
          </Row>
        </Column>

        {/* Right panel — Cost Savings */}
        <Column
          background="surface"
          border="neutral-alpha-weak"
          radius="l"
          padding="24"
          gap="24"
        >
          <Text variant="label-strong-s" onBackground="neutral-medium">
            COST SAVINGS
          </Text>
          <Column gap="20">
            <SliderRow
              label="Avg monthly salary per person"
              value={salary}
              min={500}
              max={10000}
              display={`$${salary.toLocaleString()}`}
              onChange={setSalary}
            />
            <SliderRow
              label="Monthly agency / tool spend to replace"
              value={agencySpend}
              min={0}
              max={5000}
              display={`$${agencySpend.toLocaleString()}`}
              onChange={setAgencySpend}
            />
          </Column>
          <Row gap="32" wrap>
            <StatTile value={`~${fmt(monthlySaved)}`} label="saved / month" />
            <StatTile value={`~${fmt(annualSaved)}`} label="saved / year" />
          </Row>
        </Column>
      </Grid>

      <Button
        href="mailto:musabjaved47@gmail.com"
        variant="primary"
        size="m"
        arrowIcon
      >
        Get your custom automation plan
      </Button>
    </Column>
  );
}
