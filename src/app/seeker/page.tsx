"use client";

import { useState, useCallback, useEffect, useRef } from "react";

import {
  Column,
  Row,
  Text,
  Heading,
  Button,
  LetterFx,
  Icon,
  Line,
  Schema,
} from "@once-ui-system/core";
import { baseURL, seeker, person, about } from "@/resources";
import { LocationInfo, MapEmbed, Disclaimer, DeviceInfo, DeviceInfoSkeleton } from "@/components/seeker";
import { useDeviceInfo } from "@/components/seeker/useDeviceInfo";

type GeoState = "idle" | "loading" | "success" | "denied" | "error";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export default function SeekerPage() {
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [location, setLocation] = useState<LocationData | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const device = useDeviceInfo();

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          altitudeAccuracy: pos.coords.altitudeAccuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
        });
        setGeoState("success");
        try {
          const audio = new Audio('/audio/faaahhh.wav');
          audio.play();
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      },
      (err) => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        setGeoState(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, maximumAge: 0 },
    );
  }, []);

  const reset = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoState("idle");
    setLocation(null);
  }, []);

  return (
    <Column maxWidth="m" paddingTop="24" gap="32" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={seeker.path}
        title={seeker.title}
        description={seeker.description}
        image={`/api/og/generate?title=${encodeURIComponent(seeker.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ── Header ── */}
      <Column fillWidth gap="m" horizontal="center" align="center" maxWidth={"m"}>
        <Heading variant="display-strong-s" align="center">
          <LetterFx trigger="instant" speed="medium">
            {seeker.ui.entrance.title}
          </LetterFx>
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-medium" align="center" wrap="balance">
          {seeker.description}
        </Text>
      </Column>

      {/* ── Entrance ── */}
      {(geoState === "idle" || geoState === "loading") && (
        <Column fillWidth radius="m" horizontal="center" gap="s">
          <Button
            id="grant-location"
            data-border="conservative"
            variant="primary"
            size="m"
            prefixIcon={seeker.ui.entrance?.buttonIcon}
            onClick={requestLocation}
            loading={geoState === "loading"}
            disabled={geoState === "loading"}
          >
            {seeker.ui.entrance?.button}
          </Button>

          <Text variant="label-default-xs" onBackground="neutral-strong" style={{ opacity: 0.5 }}>
            {seeker.ui.entrance?.permissionLabel}
          </Text>
        </Column>
      )}

      {geoState === "denied" && (
        <Row
          fillWidth
          padding="m"
          radius="m"
          border="warning-alpha-medium"
          background="warning-strong"
          gap="12"
          vertical="center"
          data-border="conservative"
        >
          <Icon name="warning" size="l" onBackground="warning-strong" />
          <Text variant="body-default-s" onBackground="warning-medium">
            <Text as="span" weight="strong" onBackground="warning-strong">
              {seeker.ui.denied?.heading}{" "}
            </Text>
            {seeker.ui.denied?.message}
          </Text>
          <Button
            data-border="conservative"
            variant="tertiary"
            size="s"
            onClick={reset}
            style={{ marginLeft: "auto" }}
          >
            {seeker.ui.denied?.tryAgain}
          </Button>
        </Row>
      )}

      {/* ── Results ── */}
      {geoState === "success" && location && (
        <Column fillWidth gap="32">
          <Row
            fillWidth
            padding="m"
            radius="m"
            border="danger-alpha-medium"
            background="danger-strong"
            gap="12"
            vertical="center"
            data-border="conservative"
          >
            <Icon name="danger" size="l" onBackground="danger-strong" />
            <Text variant="body-default-s" onBackground="danger-medium">
              <Text as="span" weight="strong" onBackground="danger-strong">
                {seeker.ui.results?.alertTitle}{" "}
              </Text>
              {seeker.ui.results?.alertMessage}
            </Text>
          </Row>
          <LocationInfo data={location} />
          <MapEmbed
            latitude={location.latitude}
            longitude={location.longitude}
            accuracy={location.accuracy}
          />
        </Column>
      )}

      {/* ── Device Intel ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-s">
          {seeker.ui?.device.heading}
        </Heading>

        {device ? (
          <DeviceInfo data={device} />
        ) : (
          <DeviceInfoSkeleton />
        )}
      </Column>

      <Line background="neutral-alpha-weak" fillWidth />

      <Disclaimer />
    </Column>
  );
}
