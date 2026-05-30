"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { type: "input" | "output" | "system"; text: string }
  | { type: "image"; src: string; alt?: string };

const BOOT_LINES = [
  "Initializing AI stack...",
  "Loading LangChain, Pinecone, n8n... OK",
  "Connecting to musaabjaved.com... CONNECTED",
  'Type "help" to see available commands.',
  "",
];

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "Available commands:",
    "  whoami     — who is this guy",
    "  skills     — tech stack",
    "  projects   — selected work",
    "  contact    — get in touch",
    "  hire       — let's work together",
    "  knight     — meet the knight",
    "  pikachu    — pika pika",
    "  clear      — clear terminal",
    "  sudo rm -rf /",
    "",
  ],
  whoami: () => [
    "Musaab Javed — AI Integrations Engineer",
    "~3 years building production AI systems for startups.",
    "LLMs, RAG pipelines, GTM automation, workflow integrations.",
    "Based in Lahore, Pakistan. Open to global remote.",
    "",
  ],
  skills: () => [
    "Core stack:",
    "  Python · LangChain · LangGraph · LlamaIndex",
    "  OpenAI API · Anthropic Claude · Pinecone",
    "  n8n · HubSpot · Make · Zapier",
    "  Next.js · TypeScript · Supabase",
    "  AWS · GCP · Docker",
    "",
  ],
  projects: () => [
    "Selected work:",
    "  [1] Excelr8 — GTM automation stack",
    "      Campaign setup: 4 hrs → 10 min. HubSpot + Clay + AI.",
    "",
    "  [2] Zippit — AI content operations platform",
    "      240 hrs/month saved. RAG + LangGraph + Pinecone.",
    "",
    "  More at /work",
    "",
  ],
  contact: () => [
    "Email  : musabjaved47@gmail.com",
    "LinkedIn: linkedin.com/in/musabjaved",
    "GitHub : github.com/Crypto47",
    "",
  ],
  hire: () => [
    "  ██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗",
    "  ██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝",
    "  ███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  ",
    "  ██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  ",
    "  ██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗",
    "  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝     ╚═╝╚══════╝",
    "",
    "Opening email client... 📬",
    "__HIRE__",
  ],
  "sudo rm -rf /": () => [
    "nice try.",
    "",
  ],
  "sudo rm -rf": () => [
    "nice try.",
    "",
  ],
  knight: () => [
    "Executing: ./knight.exe",
    "",
    "__IMG_/images/knight.gif|Knight GIF__",
    "",
    "⚔  A knight who says... nothing. Just slashes.",
    "",
  ],
  pikachu: () => [
    "Executing: ./pikachu.exe",
    "",
    "__IMG_/images/pikachu.gif|Pikachu GIF__",
    "",
    "⚡  Pika pika. (That's all the output.)",
    "",
  ],
};

export default function LabContent() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      if (i < BOOT_LINES.length) {
        const text = BOOT_LINES[i];
        setLines((prev) => [...prev, { type: "system", text }]);
        i++;
      } else {
        clearInterval(tick);
        setBooted(true);
      }
    }, 200);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "input", text: `> ${raw}` }]);
    setHistory((prev) => [raw, ...prev]);
    setHistoryIdx(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const output = handler();
      output.forEach((text) => {
        if (text === "__HIRE__") {
          setTimeout(() => {
            window.location.href = "mailto:musabjaved47@gmail.com?subject=Let's%20work%20together";
          }, 800);
          return;
        }
        if (text.startsWith("__IMG_") && text.endsWith("__")) {
          const inner = text.slice(6, -2);
          const [src, alt] = inner.split("|");
          setLines((prev) => [...prev, { type: "image", src, alt: alt ?? "" }]);
          return;
        }
        setLines((prev) => [...prev, { type: "output", text }]);
      });
    } else {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `command not found: ${cmd}. Type "help".` },
        { type: "output", text: "" },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (history[next] ?? ""));
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        padding: "32px 24px",
        fontFamily: "var(--font-code, monospace)",
        fontSize: "14px",
        lineHeight: "1.6",
        cursor: "text",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CRT scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color:
                line.type === "input"
                  ? "#7fff7f"
                  : line.type === "system"
                  ? "#4a9a4a"
                  : "#b0ffb0",
              whiteSpace: line.type === "image" ? "normal" : "pre",
              minHeight: "1.6em",
            }}
          >
            {line.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={line.src}
                alt={line.alt ?? ""}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  display: "block",
                  marginTop: "4px",
                  marginBottom: "4px",
                  imageRendering: "pixelated",
                  border: "1px solid #4a9a4a",
                }}
              />
            ) : (
              line.text
            )}
          </div>
        ))}

        {booted && (
          <div style={{ display: "flex", alignItems: "center", color: "#7fff7f" }}>
            <span style={{ marginRight: "8px" }}>{">"}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#7fff7f",
                fontFamily: "inherit",
                fontSize: "inherit",
                flex: 1,
                caretColor: "#7fff7f",
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "16px",
                background: "#7fff7f",
                animation: "blink 1s step-end infinite",
                marginLeft: "1px",
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
