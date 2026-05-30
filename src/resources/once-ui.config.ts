// @ts-nocheck
import type {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// IMPORTANT: Replace with your own domain before deploying
const baseURL = process.env.NODE_ENV === 'development'
  ? "http://localhost:3000"
  : "https://musaabjaved.com";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": false,
  "/doom": true,
  "/guestbook": false,
  "/seeker": true,
  "/goals": false,
  "/site-map": true,
  "/lab": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

// Import and set font for each variant
import { Instrument_Serif, Instrument_Sans, DotGothic16 } from "next/font/google";

const heading = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: "400", 
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Using JetBrains for both labels and code to lean into the dev aesthetic
const label = DotGothic16({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

const code = DotGothic16({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: "system", // dark | light | system
  neutral: "custom", // sand | gray | slate | mint | rose | dusk | custom
  brand: "custom", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "custom", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "color", // color | contrast
  solidStyle: "plastic", // flat | plastic
  border: "conservative", // rounded | playful | conservative | sharp
  surface: "translucent", // filled | translucent
  transition: "micro", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "brand-background-strong",
  },
  dots: {
    display: false,
    opacity: 80,
    size: "8",
    color: "accent-background-medium",
  },
  grid: {
    display: true,
    opacity: 80,
    color: "accent-alpha-weak",
    width: "0.67rem", 
    height: "0.67rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://app.us12.list-manage.com/subscribe/post?u=41cb82e5860cda9b036218e3a&amp;id=114e3d3110&amp;f_id=007151e0f0",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "/images/avatar.jpg",
  type: "Person",
  name: "Musaab Javed",
  description: home.description,
  email: "musabjaved47@gmail.com",
};

const sameAs: SameAsConfig = {
  github: "https://github.com/Crypto47",
  linkedin: "https://www.linkedin.com/in/musabjaved",
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: false,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
