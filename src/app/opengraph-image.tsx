import { ImageResponse } from "next/og";

export const alt =
  "Luan Cunha - Desenvolvedor Full Stack para produtos web, AI engineering, automações e sistemas";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 18% 20%, rgba(168,85,247,0.34), transparent 320px), radial-gradient(circle at 82% 18%, rgba(245,158,11,0.14), transparent 280px), linear-gradient(135deg, #090514 0%, #160927 54%, #05020a 100%)",
          color: "#f7f0ff",
          padding: 64,
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.16,
            color: "#c084fc",
            fontSize: 26,
            lineHeight: 1.6,
            letterSpacing: 1,
            transform: "rotate(-8deg) scale(1.18)",
          }}
        >
          ACCESS_GRANTED neural_handshake deploy_green API NEXT NODE REACT
          MOBILE AUTOMATION CLOUD AI_ENGINEERING CODEX CLAUDE_CODE
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              border: "1px solid rgba(192,132,252,0.48)",
              padding: "12px 18px",
              fontSize: 24,
              color: "#d8b4fe",
            }}
          >
            luan@portfolio:~$
          </div>
          <div
            style={{
              border: "1px solid rgba(245,158,11,0.32)",
              padding: "12px 18px",
              fontSize: 22,
              color: "#f5e8ff",
            }}
          >
            full stack
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 0.95,
              maxWidth: 880,
            }}
          >
            Luan Cunha
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#d8b4fe",
              maxWidth: 920,
              lineHeight: 1.08,
            }}
          >
            Produtos web, AI engineering e automações sob demanda.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#f1e5ff",
            fontSize: 24,
          }}
        >
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>React Native</span>
          <span>n8n</span>
          <span>Codex</span>
          <span>Claude Code</span>
          <span>Cloud</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
