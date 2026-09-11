import type {
  About,
  Blog,
  Contact,
  Gallery,
  Goals,
  Guestbook,
  Home,
  Newsletter,
  Person,
  ProcessStep,
  Seeker,
  Social,
  Work,
  Doom,
} from "@/types";

const person: Person = {
  firstName: "Musaab",
  lastName: "Javed",
  name: "Musaab Javed",
  role: "AI Integrations Engineer",
  avatar: "/images/avatar.jpg",
  email: "musabjaved47@gmail.com",
  location: "Asia/Karachi",
  languages: ["English", "Urdu"],
};

const doom: Doom = {
  path: "/doom",
  label: "DOOM",
  title: "DOOM Game",
  description: "",
  controls:
    "Arrow Keys to Move, CTRL to Open/Interact, SPACE to Fire, SHIFT to Strafe, ESC for Menu.",
  caution:
    "If controls don't work ensure that the game is in focus and Caps Lock is off.",
  iframe: {
    link: "/doom-game/index.html",
  },
  meme: {
    text: "Fancy some memes?",
    link: "/memes",
  },
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I might email you someday (if it's important)</>,
};

const social: Social = [
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Resume",
    icon: "resume",
    link: "/resume/Musaab_Javed_Resume.pdf",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/musabjaved",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Crypto47",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building AI integrations that actually ship.</>,
  featured: {
    display: false,
    title: <>Featured</>,
    href: "/work",
  },
  subline: (
    <>AI Integrations Engineer · 3+ years building production AI systems · Lahore, Pakistan</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `Who is ${person.name}?`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: true,
    link: "https://calendly.com/dr-dre021/30min",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: [
      <>
        I'm Musaab Javed, an AI Integrations Engineer with ~3 years of experience building
        production AI systems for startups and growth-stage companies. I design and ship
        integrations that connect LLMs, APIs, and business workflows — turning manual operations
        into automated pipelines.
      </>,
      <>
        I've worked with clients across GTM automation, content operations, lead intelligence,
        and internal tooling — helping teams cut manual work by 60–70% and reclaim hundreds of
        hours per month. I hold a Bachelor's in Computer Science from PIEAS Islamabad.
      </>,
      <>
        I'm drawn to the practical side of AI — not just building models, but making them work
        reliably inside products that real businesses depend on every day.
      </>,
    ],
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Tkrupt",
        timeframe: "2025 – 2026",
        role: "AI Integrations Engineer",
        achievements: [
          <>
            Architected and shipped LLM-powered integrations connecting OpenAI and Anthropic APIs
            to internal business workflows, significantly reducing manual processing time.
          </>,
          <>
            Built automation pipelines using n8n and custom Python services to orchestrate
            multi-step AI workflows across disparate data sources.
          </>,
          <>
            Designed RAG (Retrieval-Augmented Generation) systems using vector databases to enable
            context-aware AI responses over proprietary company data.
          </>,
        ],
        images: [],
      },
      {
        company: "WhisperFrames",
        timeframe: "2024 – 2026",
        role: "Founder",
        achievements: [
          <>
            Building an AI-powered steganography platform that protects digital art and creative
            content from AI misuse and unauthorized use.
          </>,
        ],
        images: [],
      },
      {
        company: "Zaltech AI",
        timeframe: "2024 – 2025",
        role: "AI Engineer",
        achievements: [
          <>
            Developed and deployed NLP pipelines for document processing and information extraction
            at scale.
          </>,
          <>
            Integrated AI models into client-facing products, handling everything from API design to
            production monitoring.
          </>,
          <>
            Collaborated with cross-functional teams to define AI feature requirements and deliver
            solutions aligned with business objectives.
          </>,
        ],
        images: [],
      },
      {
        company: "Developers Den",
        timeframe: "2023",
        role: "Founder",
        achievements: [
          <>
            Founded and ran a service-based tech startup, delivering software solutions to
            early-stage clients.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "PIEAS Islamabad",
        description: "Bachelor of Science in Computer Science (BSCS)",
        achievements: [],
        timeframe: "2019 – 2023",
      },
    ],
  },
  certifications: {
    display: false,
    title: "Certifications",
    certificates: [],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: <>Languages I write production code in</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "JavaScript", icon: "javascript" },
          { name: "SQL", icon: "sql" },
        ],
        images: [],
      },
      {
        title: "ML / AI Frameworks",
        description: <>Frameworks I use to build AI systems</>,
        tags: [
          { name: "PyTorch", icon: "pytorch" },
          { name: "LangChain", icon: "langchain" },
          { name: "LlamaIndex", icon: "" },
          { name: "LangGraph", icon: "" },
          { name: "Letta", icon: "" },
          { name: "Ollama", icon: "ollama" },
          { name: "Unsloth", icon: "" },
          { name: "Hugging Face", icon: "huggingface" },
        ],
        images: [],
      },
      {
        title: "Frameworks",
        description: <>Backend and frontend frameworks</>,
        tags: [
          { name: "FastAPI", icon: "fastapi" },
          { name: "Next.js", icon: "nextjs" },
          { name: "Node.js", icon: "nodejs" },
        ],
        images: [],
      },
      {
        title: "Databases & Vector Stores",
        description: <>Storage solutions I use in production</>,
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Pinecone", icon: "pinecone" },
          { name: "Firebase", icon: "firebase" },
          { name: "Supabase", icon: "supabase" },
          { name: "Airtable", icon: "airtable" },
          { name: "Redis", icon: "redis" },
        ],
        images: [],
      },
      {
        title: "CRM",
        description: <>CRM platforms I integrate and automate</>,
        tags: [
          { name: "HubSpot", icon: "hubspot" },
          { name: "GoHighLevel", icon: "" },
        ],
        images: [],
      },
      {
        title: "Workflow Automation",
        description: <>Tools I use to build automation pipelines</>,
        tags: [
          { name: "n8n", icon: "n8n" },
          { name: "Zapier", icon: "zapier" },
        ],
        images: [],
      },
      {
        title: "Data Enrichment & AI Tools",
        description: <>Tools for lead research and AI-powered workflows</>,
        tags: [
          { name: "Clay", icon: "" },
          { name: "Apollo", icon: "" },
          { name: "Apify", icon: "" },
          { name: "HeyGen", icon: "" },
          { name: "Perplexity", icon: "perplexity" },
        ],
        images: [],
      },
      {
        title: "APIs & Integrations",
        description: <>APIs I've shipped integrations against</>,
        tags: [
          { name: "OpenAI API", icon: "openai" },
          { name: "Shopify API", icon: "shopify" },
          { name: "Slack API", icon: "slack" },
          { name: "Twilio", icon: "twilio" },
          { name: "Unipile", icon: "" },
        ],
        images: [],
      },
      {
        title: "Developer Tools",
        description: <>Tools that are part of my daily workflow</>,
        tags: [
          { name: "Git", icon: "git" },
          { name: "Docker", icon: "docker" },
          { name: "Postman", icon: "postman" },
          { name: "Cursor", icon: "" },
          { name: "Claude Code", icon: "anthropic" },
          { name: "NotebookLM", icon: "" },
        ],
        images: [],
      },
      {
        title: "Cloud & Infrastructure",
        description: <>Cloud platforms I deploy to</>,
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "GCP", icon: "gcp" },
          { name: "DigitalOcean", icon: "digitalocean" },
          { name: "Vercel", icon: "vercel" },
        ],
        images: [],
      },
    ],
  },
  gif: {
    display: false,
    title: "",
    description: "",
    items: [],
  },
  goals: {
    display: false,
    title: "",
    description: "",
    label: "",
    link: "",
  },
  currently: {
    display: true,
    title: "Currently",
  },
  specialist: {
    display: true,
    title: "AI Integrations Specialist",
    description: (
      <>
        I connect LLMs to the systems businesses actually run on — CRMs, content pipelines,
        lead databases, and messaging tools — with n8n and custom Python as the backbone.
        Every build ships with monitoring, human-in-the-loop checkpoints, and a clear ROI story.
      </>
    ),
    image: {
      src: "/images/musaab-javed.jpg",
      alt: "Musaab Javed",
    },
    stats: [
      { value: "n8n Expert", label: "Primary automation platform" },
      { value: "RAG Systems", label: "Pinecone + LangChain in production" },
      { value: "CRM Integrations", label: "HubSpot & GoHighLevel pipelines" },
      { value: "LLM Engineering", label: "OpenAI & Anthropic APIs" },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Some thoughts and ideas",
  description: `Read what ${person.name} has been up to recently`,
};

const guestbook: Guestbook = {
  path: "/guestbook",
  label: "Guestbook",
  title: <>Say hi!</>,
};

const goals: Goals = {
  path: "/goals",
  label: "Goals",
  title: <>Goals</>,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Projects",
  description: `Projects and case studies by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const seeker: Seeker = {
  path: "/seeker",
  label: "Seeker",
  title: "SEEKER // Location Intelligence",
  description:
    "An educational demo inspired by thewhiteh4t/seeker, showing how websites can collect your location, device fingerprint and browser metadata. Stay vigilant.",
  ui: {
    entrance: {
      title: "Think you're safe?",
      description:
        "Go on. Tap it. It's the same split-second choice you make when checking a 'failed delivery' text or some random email. I just want to show you exactly what the bad guys see before they actually start cleaning you out. No fluff, just a look at your own front door from the outside.",
      button: "I want to know",
      buttonIcon: "globe",
      permissionLabel: "Requires location permission.",
    },
    denied: {
      heading: "ACCESS DENIED.",
      message:
        "You blocked the request. Good. But a real hacker would already be trying another way to get in.",
      tryAgain: "Try Again",
      buttonIcon: "arrowLeft",
    },
    results: {
      alertTitle: "YOU'RE TOTALLY EXPOSED.",
      alertMessage:
        "An attacker is basically sitting in your living room now. They've got your home layout, your device ID and even how much battery you have left, it's everything they need to pick their next target. You, probably.",
      locationHeading: "Live Tracking",
      gpsTitle: "GPS Coordinates",
      telemetryTitle: "Telemetry & Elevation",
      mapHeading: "Location Map",
      mapLatLabel: "Lat",
      mapLonLabel: "Lon",
      mapAccuracyPrefix: "+/- ",
      mapButtons: { google: "Google Maps", osm: "OpenStreetMap" },
      labels: {
        latitude: "Latitude",
        longitude: "Longitude",
        accuracy: "Accuracy",
        altitude: "Altitude",
        altAccuracy: "Alt. Accuracy",
        heading: "Heading",
        speed: "Speed",
        stationary: "Stationary",
        na: "N/A",
        noLeak: "No leak",
      },
    },
    device: {
      heading: "Personal Information Leak",
      sections: {
        identity: "Identity",
        network: "Network",
        networkTag: "LEAKED",
        privacy: "Privacy",
        privacyTag: "PERMISSIONS",
        hardware: "Hardware",
        resources: "Resources",
        preferences: "Preferences",
        signature: "Digital Signature",
        signatureTag: "TRACEABLE",
      },
      labels: {
        platform: "Platform",
        os: "OS",
        browser: "Browser",
        type: "Type",
        cores: "Cores",
        ram: "RAM",
        heap: "Heap",
        cameras: "Cameras",
        battery: "Battery",
        storage: "Storage",
        privateIPs: "Private IPs",
        timezone: "Timezone",
        downlink: "Downlink",
        visitorId: "Visitor ID",
        canvasHash: "Canvas Hash",
        audioHash: "Audio Hash",
        webGLVendor: "WebGL Vendor",
        plugins: "Plugins",
        batteryBlocked: "Power blocked",
        quotaBlocked: "Quota blocked",
        theme: "Theme",
        motion: "Motion",
        ratio: "Ratio",
      },
      signatureLabels: {
        visitorId: "Visitor ID",
        canvas: "Canvas Hash",
        audio: "Audio Hash",
        webGLVendor: "WebGL Vendor",
        plugins: "Plugins",
      },
    },
    disclaimer: {
      heading: "How they actually get you",
      lead: "I didn't use some complex exploit to find you, this is just standard browser behavior...",
      tipsTitle: "Defensive Measures",
      tips: [
        {
          icon: "globe",
          title: "Look at the URL, seriously",
          desc: "Sites like 'googl-secure.com' aren't real.",
        },
        {
          icon: "eyeOff",
          title: "GPS isn't for fun",
          desc: "Your coordinates show exactly where you sleep and work.",
        },
        {
          icon: "hook",
          title: "Links are just hooks",
          desc: "Every random SMS or email is a fishing line.",
        },
        {
          icon: "clean",
          title: "Clean your permissions",
          desc: "Most of us have apps watching our cameras for years.",
        },
      ],
      vectorsTitle: "Common Vectors",
      vectors: [
        {
          icon: "gifts",
          title: "The 'I Win' Scam",
          desc: "Fake prizes that only 'unlock' if you share your location.",
        },
        {
          icon: "alert",
          title: "Urgency and Fear",
          desc: "Emails about a 'suspicious purchase' that make you panic.",
        },
        {
          icon: "cut",
          title: "Obscured Destinations",
          desc: "Tiny URLs that hide 50 different tracking scripts.",
        },
        {
          icon: "compass",
          title: "Delivery 'Delays'",
          desc: "Texts about a missing package that need your GPS.",
        },
      ],
      footerIcon: "info",
      footerNotice:
        "Independent security audit demo. No data persistence. No network egress.",
    },
  },
};

export const metrics = [
  { value: "3+", label: "Years production AI" },
  { value: "60–70%", label: "Manual workflow reduction" },
  { value: "100–300 hrs", label: "Saved per client / month" },
  { value: "15+", label: "Clients served" },
];

export const services = [
  {
    title: "Lead Intelligence Systems",
    description:
      "Multi-stage lead sourcing, qualification, and enrichment pipelines across Apollo, Clay, and Apify.",
    icon: "database",
  },
  {
    title: "RAG Pipelines",
    description:
      "Production document retrieval systems over 5K+ docs using LangChain, LlamaIndex, and Pinecone.",
    icon: "search",
  },
  {
    title: "CRM & Workflow Automation",
    description:
      "Event-driven n8n automations synced to HubSpot and GoHighLevel, cutting manual ops by 60–70%.",
    icon: "settings",
  },
  {
    title: "Content Automation",
    description:
      "AI content factories — SEO articles, newsletters, and reports generated end-to-end at scale.",
    icon: "edit",
  },
];

export const process: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    icon: "search",
    description:
      "Map your manual workflows, data sources, and tools to find the highest-ROI automation targets.",
  },
  {
    step: "02",
    title: "Workflow Design",
    icon: "network",
    description:
      "Blueprint the end-to-end pipeline — triggers, CRM and API integrations, and human-in-the-loop checkpoints.",
  },
  {
    step: "03",
    title: "AI Logic",
    icon: "chip",
    description:
      "Design the LLM layer: prompt chains, RAG grounding, structured outputs, and model selection tuned for cost and accuracy.",
  },
  {
    step: "04",
    title: "Development",
    icon: "code",
    description:
      "Build the integration in n8n and custom code — API connections, error handling, retries, and deduplication.",
  },
  {
    step: "05",
    title: "Testing",
    icon: "testTube",
    description:
      "Validate against real data: edge cases, LLM output QA, and failure-mode drills before anything touches production.",
  },
  {
    step: "06",
    title: "Deployment",
    icon: "rocket",
    description:
      "Ship to production with monitoring, alerting, and rollback paths — no silent failures.",
  },
  {
    step: "07",
    title: "Optimization",
    icon: "chartUp",
    description:
      "Track cost, latency, and output quality; iterate prompts and flows as volume grows.",
  },
];

const WHATSAPP_LINK = "https://wa.me/923244606015";
const CALENDLY_LINK = "https://calendly.com/dr-dre021/30min";

export const contact: Contact = {
  display: true,
  title: "Let's Build Your Next Integration",
  description:
    "Have a workflow that eats hours every week? Tell me about it — I usually reply within a day.",
  channels: [
    {
      name: "Email",
      value: person.email,
      icon: "email",
      link: `mailto:${person.email}`,
    },
    {
      name: "Book a call",
      value: "30-min intro call",
      icon: "calendar",
      link: CALENDLY_LINK,
    },
    {
      name: "WhatsApp",
      value: "+92 324 4606015",
      icon: "whatsapp",
      link: WHATSAPP_LINK,
    },
    {
      name: "LinkedIn",
      value: "in/musabjaved",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/musabjaved",
    },
    {
      name: "GitHub",
      value: "Crypto47",
      icon: "github",
      link: "https://github.com/Crypto47",
    },
  ],
  cta: {
    heading: "Ready to get started?",
    actions: [
      { label: "Send message", icon: "email", href: `mailto:${person.email}`, variant: "primary" },
      { label: "WhatsApp", icon: "whatsapp", href: WHATSAPP_LINK, variant: "secondary" },
      { label: "Book a call", icon: "calendar", href: CALENDLY_LINK, variant: "secondary" },
    ],
  },
};

export { person, social, newsletter, home, about, blog, work, gallery, guestbook, goals, doom, seeker };
