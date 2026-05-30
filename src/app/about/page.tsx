import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  List,
  ListItem,
  SmartLink,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { CurrentlySection } from "@/components";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.goals.title,
      display: about.goals.display,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="40"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={`${language}-${index}`} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            marginBottom="24"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="m"
                padding="4"
                gap="8"
                marginTop="8"
                marginBottom="24"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon
                  paddingLeft="12"
                  name="calendar"
                  onBackground="brand-weak"
                />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="conservative"
                  variant="primary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            <Row gap="8" paddingTop="8" className={styles.blockAlign} fitWidth>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/knight.gif" alt="Knight" style={{ width: 36, height: 36, imageRendering: "pixelated" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pikachu.gif" alt="Pikachu" style={{ width: 36, height: 36, imageRendering: "pixelated" }} />
            </Row>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="4"
                wrap
                horizontal="center"
                fitWidth
                data-border="conservative"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-m"
              fillWidth
              gap="8"
              marginBottom="40"
            >
              {about.intro.description.map((paragraph, index) => (
                <Text key={`intro-${index}`}>
                  {paragraph}
                </Text>
              ))}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                  >
                    <Row
                      fillWidth
                      horizontal="between"
                      vertical="start"
                      marginBottom="4"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="s"
                    >
                      {experience.role}
                    </Text>
                    <List as="ul" textVariant="body-default-m" gap="8">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <ListItem key={`${experience.company}-${index}`}>
                            {achievement}
                          </ListItem>
                        ),
                      )}
                    </List>
                    {experience.images && experience.images.length > 0 && (
                      <Row
                        fillWidth
                        paddingTop="m"
                        paddingLeft="40"
                        gap="12"
                        wrap
                      >
                        {experience.images.map((image, index) => (
                          <Row
                            key={`${experience.company}-${index}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                  >
                    <Row fillWidth horizontal="between" vertical="start">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        style={{ textWrap: "nowrap" }}
                        onBackground="neutral-weak"
                      >
                        {institution.timeframe}
                      </Text>
                    </Row>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="s"
                    >
                      {institution.description}
                    </Text>
                    {institution?.achievements &&
                      institution.achievements?.length > 0 && (
                        <List as="ul" gap="8" textVariant="body-default-m">
                          {institution.achievements?.map((item, idx) => (
                            <ListItem key={`${institution.name}-${idx}`}>{item}</ListItem>
                          ))}
                        </List>
                      )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.certifications.display && (
            <>
              <Heading
                as="h2"
                id={about.certifications.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.certifications.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.certifications.certificates.map((certificate, index) => (
                  <Column key={`cert-${index}-${certificate.title}`} fillWidth gap="4">
                    <Row fillWidth horizontal="between" vertical="center">
                      <Column>
                        <Text id={certificate.title} variant="heading-strong-l">
                          {certificate.title}
                        </Text>
                        <Text
                          variant="body-default-m"
                          onBackground="neutral-weak"
                        >
                          {certificate.description}
                        </Text>
                      </Column>
                      <Text
                        variant="heading-default-xs"
                        style={{ textWrap: "nowrap" }}
                        onBackground="neutral-weak"
                      >
                        <Button
                          variant="tertiary"
                          size="s"
                          href={certificate.link}
                          prefixIcon="link"
                        />
                      </Text>
                    </Row>
                    {certificate.images && certificate.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {certificate.images.map((image, index) => (
                          <Row
                            key={`cert-${index}-${image.alt}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="l"
                            prefixIcon={tag.icon}
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={`${skill.title}-${index}`}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.goals.display && (
            <>
              <Heading
                as="h2"
                id={about.goals.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.goals.title}
              </Heading>
              <Column fillWidth marginBottom="40">
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {about.goals.description}
                  <SmartLink
                    href={about.goals.link}
                  >
                    {about.goals.label}
                  </SmartLink>
                </Text>
              </Column>
            </>
          )}

          {about.currently.display && (
            <CurrentlySection title={about.currently.title} />
          )}

          {about.gif.display && about.gif.items.length > 0 && (
            <>
              {about.gif.title && (
                <Heading
                  as="h2"
                  id={about.gif.title}
                  variant="display-strong-s"
                  marginBottom="m"
                >
                  {about.gif.title}
                </Heading>
              )}
              {about.gif.description && (
                <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="m">
                  {about.gif.description}
                </Text>
              )}
              <Row fillWidth gap="m" marginBottom="40" wrap>
                {about.gif.items.map((gif) => (
                  <Media
                    key={gif.src}
                    aspectRatio="1/1"
                    enlarge
                    radius="m"
                    alt={gif.alt}
                    src={gif.src}
                    style={{ flex: "1 1 200px", maxWidth: "280px" }}
                  />
                ))}
              </Row>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}