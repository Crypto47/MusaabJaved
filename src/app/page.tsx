import {
  ClientsCarousel,
  ContactSection,
  HeroBackground,
  Mailchimp,
  ProcessSection,
  ROICalculator,
  ServicesGrid,
  TestimonialsCarousel,
} from "@/components";
import { Projects } from "@/components/work/Projects";
import { about, baseURL, home, metrics, person, routes } from "@/resources";
import { getClientLogos, getTestimonials } from "@/utils/utils";
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Meta,
  RevealFx,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const clients = getClientLogos();
  const testimonials = getTestimonials();
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            url: baseURL,
            email: person.email,
            image: `${baseURL}${person.avatar}`,
            sameAs: ["https://github.com/Crypto47", "https://www.linkedin.com/in/musabjaved"],
            knowsAbout: [
              "AI Automation",
              "RAG Pipelines",
              "LangChain",
              "LangGraph",
              "n8n",
              "HubSpot",
              "Lead Intelligence",
              "Python",
              "Next.js",
              "Pinecone",
              "LlamaIndex",
            ],
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "PIEAS Islamabad",
            },
          }),
        }}
      />
      <Column fillWidth horizontal="center" gap="m" position="relative">
        <HeroBackground />
        <Column maxWidth="s" horizontal="center" align="center" position="relative" zIndex={1}>
          {home.featured.display && (
            <RevealFx speed="fast" fillWidth horizontal="center" paddingBottom="32" delay={0.35}>
              <Badge
                background="brand-alpha-weak"
                paddingX="8"
                paddingY="4"
                radius="m"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Text paddingY="2">{home.featured.title}</Text>
              </Badge>
            </RevealFx>
          )}
          <RevealFx speed="fast" translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            speed="fast"
            translateY="8"
            delay={0.1}
            fillWidth
            horizontal="center"
            paddingTop="8"
            paddingBottom="32"
            style={{ overflow: "visible" }}
          >
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx speed="fast" paddingTop="4" delay={0.15} horizontal="center" paddingLeft="12">
            <Row gap="12" wrap horizontal="center">
              <Button
                id="about"
                data-border="conservative"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Avatar
                      marginRight="8"
                      style={{ marginLeft: "-0.75rem" }}
                      src={person.avatar}
                      size="m"
                    />
                  )}
                  {about.title}
                </Row>
              </Button>
              <Button
                href="https://calendly.com/dr-dre021/30min"
                variant="primary"
                size="m"
                prefixIcon="calendar"
                label="Book a call"
              />
            </Row>
          </RevealFx>
          <RevealFx
            speed="fast"
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="center"
            paddingTop="48"
          >
            <Row gap="40" wrap horizontal="center">
              {metrics.map((m) => (
                <Column key={m.value} horizontal="center" gap="4">
                  <Heading variant="display-strong-m" align="center">
                    {m.value}
                  </Heading>
                  <Text variant="label-default-s" onBackground="neutral-weak" align="center">
                    {m.label}
                  </Text>
                </Column>
              ))}
            </Row>
          </RevealFx>
        </Column>
      </Column>

      <RevealFx speed="fast" translateY="12" delay={0.1} fillWidth>
        <ServicesGrid />
      </RevealFx>

      <RevealFx speed="fast" translateY="12" delay={0.15} fillWidth>
        <ClientsCarousel clients={clients} />
      </RevealFx>

      {routes["/work"] && (
        <RevealFx speed="fast" translateY="12" delay={0.2} fillWidth>
          <Column fillWidth horizontal="center" gap="32" marginTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
              Selected Projects
            </Heading>
            <Projects featuredOnly />
            <Button href="/work" variant="secondary" size="m" arrowIcon label="View all projects" />
          </Column>
        </RevealFx>
      )}

      <RevealFx speed="fast" translateY="12" delay={0.25} fillWidth>
        <TestimonialsCarousel testimonials={testimonials} />
      </RevealFx>

      <ProcessSection />

      <RevealFx speed="fast" translateY="12" delay={0.3} fillWidth>
        <ROICalculator />
      </RevealFx>

      <RevealFx speed="fast" translateY="12" delay={0.35} fillWidth>
        <ContactSection />
      </RevealFx>

      <Mailchimp />
    </Column>
  );
}
