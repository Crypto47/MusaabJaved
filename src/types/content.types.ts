import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode[];
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: string;
      /** Achievements at the institution */
      achievements?: string[];
      /** Timeframe of studies */
      timeframe: string;
    }>;
  };
  certifications: {
    /** Whether to display certifications section */
    display: boolean;
    /** Title for the certifications section */
    title: string;
    /** List of certifications */
    certificates: Array<{
      /** Certification title */
      title: string;
      /** Certification description */
      description: React.ReactNode;
      /** Certification images */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
      /** Certification link */
      link: string;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /**
   * Gif section
   */
  gif: {
    /** Whether to display the gif section */
    display: boolean;
    /** Title for the gif section */
    title: string;
    /** Description for the gif section */
    description: string;
    /** GIFs to display */
    items: Array<{
      /** Path to the gif */
      src: string;
      /** Alt text for the gif */
      alt: string;
    }>;
  };
  /** Goals section configuration */
  goals: {
    /** Whether to display the goals section */
    display: boolean;
    /** Title for the goals section */
    title: string;
    /** Description for the goals section */
    description: string;
    /** Call to action text for the goals section */
    label: string;
    /** Link for the goals section */
    link: string;
  };
  /** Currently section configuration */
  currently: {
    /** Whether to display the currently section */
    display: boolean;
    /** Title for the currently section */
    title: string;
  };
  /** Specialist section (photo + pitch + expertise stat-cards) */
  specialist: {
    /** Whether to display the specialist section */
    display: boolean;
    /** Title for the specialist section */
    title: string;
    /** Pitch paragraph */
    description: React.ReactNode;
    /** Portrait image */
    image: {
      src: string;
      alt: string;
    };
    /** Expertise stat-cards */
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
}

/**
 * A single step in the "How I Work" process section.
 */
export interface ProcessStep {
  /** Step number, e.g. "01" */
  step: string;
  /** Step title */
  title: string;
  /** One-liner description */
  description: string;
  /** Optional icon */
  icon?: IconName;
}

/**
 * A single contact channel card.
 */
export interface ContactChannel {
  /** Channel name, e.g. "Email" */
  name: string;
  /** Secondary line shown on the card */
  value: string;
  /** Icon name from iconLibrary */
  icon: IconName;
  /** Target link */
  link: string;
}

/**
 * Contact section configuration (homepage).
 */
export interface Contact {
  /** Whether to display the contact section */
  display: boolean;
  /** Section heading */
  title: string;
  /** Intro line under the heading */
  description: string;
  /** Contact channel cards */
  channels: ContactChannel[];
  /** Bottom call-to-action row */
  cta: {
    heading: string;
    actions: Array<{
      label: string;
      icon: IconName;
      href: string;
      variant: "primary" | "secondary";
    }>;
  };
}

/**
 * Guestbook Section
 * @description The below information will be displayed on the Home page in Guestbook block
 */
export interface Guestbook extends Omit<BasePageConfig, 'description' | 'title'> {
  /** Title of the guestbook section */
  title: React.ReactNode;
  description?: string;
};

/**
 * Goals page configuration.
 * @description Configuration for the Goals page.
 */
export interface Goals extends Omit<BasePageConfig, 'description' | 'title'> {
  /** Title of the goals page */
  title: React.ReactNode;
  description?: string;
};

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}

/**
 * Doom page configuration.
 */
export interface Doom extends BasePageConfig {
  controls: string;
  caution: string;
  iframe: {
    link: string;
  };
  meme?: {
    text: string;
    link: string;
  };
}

/**
 * Seeker page configuration , location & fingerprint demo.
 */
export interface Seeker extends BasePageConfig {
  ui: {
    entrance: {
      title: string;
      description: string;
      button: string;
      buttonIcon: IconName;
      permissionLabel: string;
    };
    denied: {
      heading: string;
      message: string;
      tryAgain: string;
      buttonIcon: IconName;
    };
    results: {
      alertTitle: string;
      alertMessage: string;
      locationHeading: string;
      gpsTitle: string;
      telemetryTitle: string;
      mapHeading: string;
      mapLatLabel: string;
      mapLonLabel: string;
      mapAccuracyPrefix: string;
      mapButtons: {
        google: string;
        osm: string;
      };
      labels: Record<string, string>;
    };
    device: {
      heading: string;
      sections: {
        identity: string;
        network: string;
        networkTag: string;
        privacy: string;
        privacyTag: string;
        hardware: string;
        resources: string;
        preferences: string;
        signature: string;
        signatureTag: string;
      };
      labels: Record<string, string>;
      signatureLabels: Record<string, string>;
    };
    disclaimer: {
      heading: string;
      lead: string;
      tipsTitle: string;
      tips: Array<{ icon: string; title: string; desc: string }>;
      vectorsTitle: string;
      vectors: Array<{ icon: string; title: string; desc: string }>;
      footerNotice: string;
      footerIcon: IconName;
    };
  };
}
