import { Column, Heading, Grid } from "@once-ui-system/core";
import { DataRow } from "./DataRow";
import { SectionCard } from "./SectionCard";
import { seeker } from "@/resources";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface RowConfig {
  labelKey: string;
  getValue: () => string;
}

export function LocationInfo({ data }: { data: LocationData }) {
  const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = data;
  const ui = seeker.ui.results;
  const labels = ui.labels;

  const gpsRows: RowConfig[] = [
    { labelKey: "latitude", getValue: () => `${latitude.toFixed(8)} deg` },
    { labelKey: "longitude", getValue: () => `${longitude.toFixed(8)} deg` },
    { labelKey: "accuracy", getValue: () => `${ui.mapAccuracyPrefix}${accuracy.toFixed(1)} m` },
  ];

  const telemetryRows: RowConfig[] = [
    {
      labelKey: "altitude",
      getValue: () => (altitude !== null ? `${altitude.toFixed(1)} m ASL` : labels.na),
    },
    {
      labelKey: "altAccuracy",
      getValue: () =>
        altitudeAccuracy !== null ? `${ui.mapAccuracyPrefix}${altitudeAccuracy.toFixed(1)} m` : labels.na,
    },
    {
      labelKey: "heading",
      getValue: () => (heading !== null ? `${heading.toFixed(1)} deg` : labels.na),
    },
    {
      labelKey: "speed",
      getValue: () => (speed !== null ? `${(speed * 3.6).toFixed(1)} km/h` : labels.stationary),
    },
  ];

  return (
    <Column fillWidth gap="16">
      <Heading as="h2" variant="display-strong-s">
        {ui.locationHeading}
      </Heading>
      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        <SectionCard icon="map" title={ui.gpsTitle}>
          {gpsRows.map((row) => (
            <DataRow
              key={row.labelKey}
              label={labels[row.labelKey]}
              value={row.getValue()}
            />
          ))}
        </SectionCard>
        <SectionCard icon="compass" title={ui.telemetryTitle}>
          {telemetryRows.map((row) => (
            <DataRow
              key={row.labelKey}
              label={labels[row.labelKey]}
              value={row.getValue()}
            />
          ))}
        </SectionCard>
      </Grid>
    </Column>
  );
}
