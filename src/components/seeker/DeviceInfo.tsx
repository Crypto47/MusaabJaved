import { Column, Grid, Skeleton } from '@once-ui-system/core';
import type { DeviceData } from './useDeviceInfo';
import type { IconName } from '@/resources/icons';
import { DataRow } from './DataRow';
import { SectionCard } from './SectionCard';
import { seeker } from '@/resources';

interface DeviceInfoProps {
  data: DeviceData;
}

type VariantType =
  | 'danger-strong'
  | 'neutral-strong'
  | 'success-strong'
  | 'warning-strong';

interface SectionConfig {
  icon: IconName;
  titleKey: keyof typeof seeker.ui.device.sections;
  tagKey?: keyof typeof seeker.ui.device.sections;
  tagVariant?: 'danger' | 'warning' | 'neutral' | 'success';
  rows: Array<{
    labelKey: keyof typeof seeker.ui.device.labels;
    getValue: () => string;
    variant?: VariantType;
  }>;
}

interface SignatureRowConfig {
  labelKey: keyof typeof seeker.ui.device.signatureLabels;
  getValue: () => string;
  variant?: VariantType;
}

interface ResourceRow {
  labelKey: keyof typeof seeker.ui.device.labels;
  getValue: () => string | null;
  fallback: string;
  variant?: VariantType;
}

const DEVICE_SECTIONS = [
  { icon: 'masks', titleKey: 'identity' },
  {
    icon: 'network',
    titleKey: 'network',
    tagKey: 'networkTag',
    tagVariant: 'danger' as const,
  },
  { icon: 'chip', titleKey: 'hardware' },
  { icon: 'settings', titleKey: 'preferences' },
] as const;

export function DeviceInfo({ data }: DeviceInfoProps) {
  const {
    browser,
    os,
    device,
    fingerprint,
    screen,
    network,
    hardware,
    battery,
    storage,
    permissions,
    preferences,
    media,
  } = data;
  const ui = seeker.ui.device;

  const sections: SectionConfig[] = [
    {
      ...DEVICE_SECTIONS[0],
      rows: [
        { labelKey: 'platform', getValue: () => hardware.platform },
        { labelKey: 'os', getValue: () => `${os.name} ${os.version}` },
        {
          labelKey: 'browser',
          getValue: () => `${browser.name} ${browser.version}`,
        },
        { labelKey: 'type', getValue: () => device.type.toUpperCase() },
      ],
    },
    {
      ...DEVICE_SECTIONS[1],
      rows: [
        {
          labelKey: 'privateIPs',
          getValue: () =>
            network.localIPs.length > 0
              ? network.localIPs.join(', ')
              : ui.labels.noLeak,
          variant:
            network.localIPs.length > 0 ? 'danger-strong' : 'neutral-strong',
        },
        { labelKey: 'timezone', getValue: () => network.timezone },
        { labelKey: 'downlink', getValue: () => network.downlink },
      ],
    },
    {
      ...DEVICE_SECTIONS[2],
      rows: [
        {
          labelKey: 'cores',
          getValue: () => `${hardware.hardwareConcurrency}`,
        },
        { labelKey: 'ram', getValue: () => hardware.deviceMemory },
        { labelKey: 'heap', getValue: () => hardware.heapTotal },
        { labelKey: 'cameras', getValue: () => String(media.cameras) },
      ],
    },
    {
      ...DEVICE_SECTIONS[3],
      rows: [
        { labelKey: 'theme', getValue: () => preferences.darkMode },
        { labelKey: 'motion', getValue: () => preferences.reducedMotion },
        { labelKey: 'ratio', getValue: () => `${screen.pixelRatio}x` },
      ],
    },
  ];

  const signatureLeft: SignatureRowConfig[] = [
    {
      labelKey: 'visitorId',
      getValue: () => fingerprint.visitorId,
      variant: 'danger-strong',
    },
    {
      labelKey: 'canvas',
      getValue: () => fingerprint.canvas,
      variant: 'danger-strong',
    },
    {
      labelKey: 'audio',
      getValue: () => fingerprint.audio,
      variant: 'danger-strong',
    },
  ];

  const signatureRight: SignatureRowConfig[] = [
    { labelKey: 'webGLVendor', getValue: () => fingerprint.webGLVendor },
    { labelKey: 'plugins', getValue: () => fingerprint.plugins },
  ];

  const resourceRows: ResourceRow[] = [
    {
      labelKey: 'battery',
      getValue: () => (battery ? battery.level : null),
      fallback: ui.labels.batteryBlocked,
      variant: battery?.charging ? 'success-strong' : 'neutral-strong',
    },
    {
      labelKey: 'storage',
      getValue: () => storage?.quota || null,
      fallback: ui.labels.quotaBlocked,
    },
  ];

  return (
    <Column fillWidth gap='24'>
      <Grid columns='2' gap='12' fillWidth s={{ columns: '1' }}>
        {sections.map((section) => (
          <SectionCard
            key={section.titleKey}
            icon={section.icon}
            title={ui.sections[section.titleKey]}
            tag={
              section.tagKey && section.tagVariant
                ? {
                    label: ui.sections[section.tagKey],
                    variant: section.tagVariant,
                  }
                : undefined
            }
          >
            {section.rows.map((row) => (
              <DataRow
                key={row.labelKey}
                label={ui.labels[row.labelKey]}
                value={row.getValue()}
                variant={row.variant}
              />
            ))}
          </SectionCard>
        ))}

        <SectionCard
          icon='shield'
          title={ui.sections.privacy}
          tag={{ label: ui.sections.privacyTag, variant: 'warning' }}
        >
          {Object.entries(permissions).map(([name, state]) => (
            <DataRow
              key={name}
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              value={state}
              variant={getPermissionVariant(state)}
            />
          ))}
        </SectionCard>

        <SectionCard icon='battery' title={ui.sections.resources}>
          {resourceRows.map((row) => (
            <DataRow
              key={row.labelKey}
              label={ui.labels[row.labelKey]}
              value={row.getValue() || row.fallback}
              variant={row.variant}
            />
          ))}
        </SectionCard>
      </Grid>

      <SectionCard
        icon='signature'
        title={ui.sections.signature}
        tag={{ label: ui.sections.signatureTag, variant: 'danger' }}
      >
        <Grid gap='8' columns='2' fillWidth s={{ columns: '1' }}>
          <Column gap='8'>
            {signatureLeft.map((row) => (
              <DataRow
                key={row.labelKey}
                label={ui.signatureLabels[row.labelKey]}
                value={row.getValue()}
                variant={row.variant}
              />
            ))}
          </Column>
          <Column gap='8'>
            {signatureRight.map((row) => (
              <DataRow
                key={row.labelKey}
                label={ui.signatureLabels[row.labelKey]}
                value={row.getValue()}
                variant={row.variant}
              />
            ))}
          </Column>
        </Grid>
      </SectionCard>
    </Column>
  );
}

function getPermissionVariant(state: string) {
  if (state === 'granted') return 'success-strong';
  if (state === 'denied') return 'danger-strong';
  if (state === 'prompt') return 'warning-strong';
  return 'neutral-strong';
}

export function DeviceInfoSkeleton() {
  const mainGridCount = DEVICE_SECTIONS.length + 2; // sections + privacy + resources
  return (
    <Column fillWidth gap="24">
      <Grid columns="2" gap="12" fillWidth s={{ columns: "1" }}>
        {[...Array(mainGridCount)].map((_, i) => (
          <Skeleton
            key={i}
            shape="block"
            style={{ height: "160px", width: "100%", borderRadius: "var(--radius-m)" }}
          />
        ))}
      </Grid>
      <Skeleton
        shape="block"
        style={{ height: "200px", width: "100%", borderRadius: "var(--radius-m)" }}
      />
    </Column>
  );
}
