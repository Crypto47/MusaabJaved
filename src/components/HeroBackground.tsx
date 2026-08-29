"use client";

import { Column, Flex, Icon } from "@once-ui-system/core";
import styles from "./HeroBackground.module.scss";

interface HeroBackgroundProps {
  /**
   * "beams" — tool nodes with animated beams converging behind the headline.
   * "constellation" — reserved for the Ivan-style labeled-dot fallback; renders beams until implemented.
   */
  variant?: "beams" | "constellation";
}

// % coordinates within the hero; beams converge at HUB
const HUB = { x: 50, y: 42 };

const HERO_NODES = [
  { icon: "n8n", x: 6, y: 18 },
  { icon: "openai", x: 3, y: 58 },
  { icon: "hubspot", x: 14, y: 88 },
  { icon: "slack", x: 94, y: 18 },
  { icon: "gmail", x: 97, y: 58 },
  { icon: "pinecone", x: 86, y: 88 },
] as const;

const beamPath = (x: number, y: number) => {
  const midX = (x + HUB.x) / 2;
  const midY = y < HUB.y ? y + 8 : y - 8;
  return `M ${x} ${y} Q ${midX} ${midY} ${HUB.x} ${HUB.y}`;
};

export const HeroBackground = ({ variant = "beams" }: HeroBackgroundProps) => {
  return (
    <Column
      fill
      position="absolute"
      top="0"
      left="0"
      zIndex={0}
      pointerEvents="none"
      s={{ hide: true }}
      className={styles.root}
      aria-hidden="true"
      data-variant={variant}
    >
      <svg
        className={styles.beams}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="presentation"
      >
        <title>Decorative integration beams</title>
        {HERO_NODES.map((node, i) => (
          <g key={node.icon}>
            <path
              d={beamPath(node.x, node.y)}
              className={styles.track}
              pathLength={100}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={beamPath(node.x, node.y)}
              className={styles.pulse}
              pathLength={100}
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </g>
        ))}
      </svg>
      {HERO_NODES.map((node, i) => (
        <Flex
          key={node.icon}
          className={styles.node}
          style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${i * 0.9}s` }}
          background="surface"
          border="neutral-alpha-weak"
          radius="full"
          padding="8"
        >
          <Icon name={node.icon} size="s" onBackground="neutral-weak" />
        </Flex>
      ))}
    </Column>
  );
};

HeroBackground.displayName = "HeroBackground";
