"use client";

import {
  Button,
  Column,
  Heading,
  Row,
  Schema,
  SmartLink,
  Text,
  useToast,
} from "@once-ui-system/core";
import { baseURL, doom, person, about } from "@/resources";
import { useEffect, useRef, useState } from "react";

export default function DoomPage() {
  const { addToast } = useToast();
  const toastShown = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (toastShown.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (isMobile && isPortrait) {
      addToast({
        variant: "danger",
        message: "Landscape mode recommended for the best experience.",
      });
      toastShown.current = true;
    }
  }, [addToast]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "doom-ready") {
        setIsLoaded(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Column maxWidth="m" paddingTop="24" gap="40" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={doom.path}
        title={doom.title}
        description={doom.description}
        image={`/api/og/generate?title=${encodeURIComponent(doom.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column
        direction="column"
        fillWidth
        horizontal="center"
        paddingBottom="4"
      >
        <Heading variant="display-strong-s" align="center">
          {doom.label}
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-medium"
          align="center"
          wrap="balance"
        >
          {doom.description}
        </Text>
      </Column>
      <Column gap="16" fillWidth horizontal="center">
        <Text
          align="center"
          variant="label-default-xs"
          onBackground="neutral-weak"
          wrap="balance"
        >
          {doom.controls}
        </Text>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media (orientation: landscape) and (max-height: 600px) {
            .doom-iframe {
              height: 80vh !important;
              max-height: none !important;
              max-width: 800px !important;
              aspect-ratio: auto !important;
            }
          }
        `,
          }}
        />
        <Column
          style={{
            position: "relative",
            maxWidth: "700px",
            width: "100%",
            aspectRatio: "16/10",
            minWidth: "285px", 
            minHeight: "180px",
          }}
        >
          {!isLoaded && (
            <Column
              gap="24"
              style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-m)",
              background: "#0a0a0a",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontFamily: "var(--font-label)",
            }}>
              {/* scanlines */}
              <Row style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                pointerEvents: "none",
                zIndex: 2,
              }} />

              {/* title */}
              <Row style={{
                color: "#ff4444",
                fontSize: "clamp(16px, 5.4vw, 40px)",
                fontWeight: "bold",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textShadow: "0 0 10px #ff4444, 0 0 20px #ff2222",
                imageRendering: "pixelated",
              }}>
                ░▒▓ DOOM ▓▒░
              </Row>

              {/* loading label */}
              <Row style={{
                color: "#aaaaaa",
                fontSize: "clamp(9px, 2vw, 12px)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}>
                LOADING GAME ASSETS
                <span style={{ animation: "retro-blink 1s step-start infinite" }}>█</span>
              </Row>

              {/* loading bar */}
              <Row style={{
                width: "55%",
                border: "2px solid #444",
                padding: "3px",
                background: "#111",
              }}>
                <Row s={{ hide: true}} style={{
                  height: "12px",
                  background: "linear-gradient(90deg, #8b0000, #ff4444)",
                  boxShadow: "0 0 8px #ff4444",
                  animation: "retro-load 5s ease-in-out forwards",
                  transformOrigin: "left",
                }} />
                <Row 
                l={{hide: true}}
                s={{hide: false}}
                style={{
                  height: "4px",
                  background: "linear-gradient(90deg, #8b0000, #ff4444)",
                  boxShadow: "0 0 8px #ff4444",
                  animation: "retro-load 5s ease-in-out forwards",
                  transformOrigin: "left",
                }} />
              </Row>

              {/* flavour text */}
              <Row style={{
                color: "#aaaaaa",
                fontSize: "clamp(8px, 1.5vw, 10px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>
                RIP AND TEAR UNTIL IT IS DONE
              </Row>

              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes retro-blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                @keyframes retro-load {
                  0%   { width: 5%; }
                  60%  { width: 85%; }
                  80%  { width: 90%; }
                  100% { width: 95%; }
                }
              `}} />
            </Column>
          )}
          <iframe
            src={doom.iframe.link}
            className="doom-iframe"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              aspectRatio: "16/10",
              borderRadius: "var(--radius-m)",
              boxShadow: "var(--shadow-l-strong)",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
            title={doom.title}
            allowFullScreen
          />
        </Column>
        <Text
          align="center"
          variant="label-default-xs"
          onBackground="neutral-weak"
        >
          {doom.caution}{" "}
          <SmartLink href="/doom-game/index.html">Play in fullscreen</SmartLink>
        </Text>
        {doom?.meme && (
          <Row marginTop="12">
          <Button
            variant="tertiary"
            size="s"
            href={doom.meme.link}
            style={{ opacity: 0.5 }}
          >
            {doom.meme.text}
          </Button>
        </Row>
        )}
      </Column>
    </Column>
  );
}
