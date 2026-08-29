import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, metrics } from "@/resources";
import {
  Mailchimp,
  ClientsCarousel,
  ServicesGrid,
  TestimonialsCarousel,
  ROICalculator,
  HeroBackground,
  ProcessSection,
  ContactSection,
} from "@/components";
import { getClientLogos, getTestimonials } from "@/utils/utils";
import { Projects } from "@/components/work/Projects";

export const dynamic = 'force-dynamic';

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
            sameAs: [
              "https://github.com/Crypto47",
              "https://www.linkedin.com/in/musabjaved",
            ],
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
            worksFor: {
              "@type": "Organization",
              name: "Tkrupt",
            },
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
            <RevealFx
              fillWidth
              horizontal="center"
              paddingBottom="32"
              delay={1.2}
            >
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
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingTop="8" paddingBottom="32" style={{ overflow: "visible" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="4" delay={0.4} horizontal="center" paddingLeft="12">
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
          <RevealFx translateY="8" delay={0.6} fillWidth horizontal="center" paddingTop="48">
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

      <RevealFx translateY="12" delay={0.8} fillWidth>
        <ServicesGrid />
      </RevealFx>

      <RevealFx translateY="12" delay={0.9} fillWidth>
        <ClientsCarousel clients={clients} />
      </RevealFx>

      {routes["/work"] && (
        <RevealFx translateY="12" delay={1.0} fillWidth>
          <Column fillWidth horizontal="center" gap="32" marginTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance" align="center">
              Selected Projects
            </Heading>
            <Projects featuredOnly />
            <Button
              href="/work"
              variant="secondary"
              size="m"
              arrowIcon
              label="View all projects"
            />
          </Column>
        </RevealFx>
      )}

      <RevealFx translateY="12" delay={1.05} fillWidth>
        <TestimonialsCarousel testimonials={testimonials} />
      </RevealFx>

      <RevealFx translateY="12" delay={1.1} fillWidth>
        <ProcessSection />
      </RevealFx>

      <RevealFx translateY="12" delay={1.15} fillWidth>
        <ROICalculator />
      </RevealFx>

      <RevealFx translateY="12" delay={1.2} fillWidth>
        <ContactSection />
      </RevealFx>

      <Mailchimp />
    </Column>
  );
}
