"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Heading, Text, Button, Skeleton, Flex, Row, Icon, Toast, useToast } from "@once-ui-system/core";
import Link from "next/link";

type Meme = {
  url: string;
  title: string;
  subreddit: string;
  postLink: string;
};

const memeDisclaimer = <>These memes are by the D3VD API. They do not represent the views or opinions of Samiullah Javed and are implemented solely for entertainment purposes.</>

export default function NotFound() {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToast } = useToast();
  const toastShown = useRef(false);

  const fetchMeme = async () => {
    setApiLoading(true);
    setImageLoading(true);
    setError(false);
    try {
      const res = await fetch("https://meme-api.com/gimme");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setMeme(data);
    } catch (err) {
      console.log("Meme fetch failed", err);
      setError(true);
    } finally {
      setApiLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchMeme();
  }, []);

  const isFullyLoaded = !apiLoading && !imageLoading && meme;

  useEffect(() => {
    if (toastShown.current) return;

    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (isMobile) {
      addToast({
        variant: "danger",
        message: memeDisclaimer,
      });
      toastShown.current = true;
    }
  }, [addToast]);

  return (
    <Column fill horizontal="center" gap="l" padding="m">
      <Column horizontal="center" gap="8">
        <Heading variant="display-strong-s">404 - Page Not Found</Heading>
        <Row vertical="center" gap="8">
          <Text align="center" variant="body-default-m" onBackground="neutral-medium">
            The page you're looking for is gone, but here's a meme.
          </Text>
          <Icon 
            m={{ hide: true }}
            name="info" 
            size="xs" 
            marginTop="2"
            onBackground="brand-weak"
            tooltip={<Text style={{ maxWidth: "240px", textWrap: "balance" }} variant="body-default-xs" onBackground="neutral-medium">{memeDisclaimer}</Text>}
            tooltipPosition="bottom"
          />
        </Row>
      </Column>

      <Flex 
        direction="column" 
        background="surface" 
        border="neutral-medium" 
        radius="l" 
        padding="16" 
        style={{ 
          width: '100%', 
          maxWidth: "480px",
          minHeight: "496px", // Matches skeleton + text height exactly
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!isFullyLoaded && !error && (
          <Column gap="16" fill>
            <Skeleton shape="block" style={{ width: '100%', height: "400px", borderRadius: "var(--radius-m)" }} />
            <Column gap="4">
              <Skeleton shape="block" style={{ width: '80%', height: "24px", borderRadius: "var(--radius-s)" }} />
              <Skeleton shape="block" style={{ width: '30%', height: "16px", borderRadius: "var(--radius-s)" }} />
            </Column>
          </Column>
        )}

        {error && (
          <Flex fill direction="column" center gap="m" padding="32">
            <Text variant="display-default-xs" marginBottom="m" style={{ fontSize: '72px' }}>🛰️</Text>
            <Column horizontal="center" gap="s">
              <Text variant="label-default-l" weight="strong">Meme Machine Broke</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                We sent a specialized team of internet archaeologists to find a meme, but they got lost in the 404 void.
              </Text>
            </Column>
            <Button variant="secondary" size="s" onClick={fetchMeme}>
              Try to fix it
            </Button>
          </Flex>
        )}

        {meme && !error && (
          <Column 
            gap="16" 
            style={{ 
              display: isFullyLoaded ? 'flex' : 'none',
            }}
          >
            <img
              src={meme.url}
              alt={meme.title}
              onLoad={() => setImageLoading(false)}
              style={{ 
                width: "100%", 
                height: "400px", 
                borderRadius: "var(--radius-m)", 
                objectFit: "contain",
                background: "var(--neutral-alpha-strong)"
              }}
            />
            <Column gap="4" style={{ height: '44px' }}>
              <Text variant="label-default-l" weight="strong" wrap="nowrap" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {meme.title}
              </Text>
              <Link href={meme.postLink} target="_blank">
                <Text variant="label-default-s">r/{meme.subreddit}</Text>
              </Link>
            </Column>
          </Column>
        )}
      </Flex>

      <Row horizontal="center" gap="8" wrap>
        <Button prefixIcon="hand" variant="primary" size="s" onClick={fetchMeme}>
          Give me another meme! 
        </Button>
        <Button prefixIcon="home" href="/" variant="secondary" size="s">Home</Button>
      </Row>
    </Column>
  );
}
