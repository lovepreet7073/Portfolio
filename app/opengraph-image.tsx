// design-ignore-file: next/og ImageResponse is rendered by Satori at the edge,
// which requires literal inline styles and hex colors — Tailwind classes and
// CSS custom properties don't apply here. Values below are hand-mirrored from
// DESIGN.md's color tokens.
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lovepreet Kaur — React.js & MERN Developer";
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
            "linear-gradient(135deg, #16171A 0%, #1F2025 50%, #202228 100%)",
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
              "radial-gradient(circle at 85% 15%, rgba(63, 134, 114, 0.35) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(79, 169, 138, 0.2) 0%, transparent 45%)",
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
              background: "linear-gradient(135deg, #4FA98A, #3F8672)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16171A",
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
              color: "#9CA3AF",
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
              color: "#4FA98A",
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
              color: "#4FA98A",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            React.js &amp; MERN Developer
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
              color: "#9CA3AF",
              fontFamily: "monospace",
            }}
          >
            <span>MERN</span>
            <span>·</span>
            <span>Shopify</span>
            <span>·</span>
            <span>WordPress</span>
            <span>·</span>
            <span>Next.js</span>
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#7B828C",
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
