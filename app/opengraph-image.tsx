// design-ignore-file: next/og ImageResponse is rendered by Satori at the edge,
// which requires literal inline styles and hex colors — Tailwind classes and
// CSS custom properties don't apply here. Values below are hand-mirrored from
// DESIGN.md's color tokens.
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lovepreet Kaur — Technical Product Designer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0B0D12 0%, #151823 50%, #1C2030 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 15%, rgba(129, 140, 248, 0.35) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(165, 180, 252, 0.2) 0%, transparent 45%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #A5B4FC, #818CF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0D12",
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            LK
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94A3B8",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            lk.dev
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "30px",
              color: "#A5B4FC",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            $ whoami
          </div>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              display: "flex",
            }}
          >
            Lovepreet Kaur
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#A5B4FC",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            Product Designer · MERN Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "24px",
              color: "#94A3B8",
              fontFamily: "monospace",
            }}
          >
            <span>UI/UX</span>
            <span>·</span>
            <span>Design Systems</span>
            <span>·</span>
            <span>MERN</span>
            <span>·</span>
            <span>Shopify</span>
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#64748B",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            2+ yrs · Punjab, IN
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
