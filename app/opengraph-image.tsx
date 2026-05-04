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
            "linear-gradient(135deg, #050b18 0%, #0a1628 50%, #0f1d33 100%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 15%, rgba(94, 234, 212, 0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(45, 212, 191, 0.12) 0%, transparent 45%)",
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
              background: "linear-gradient(135deg, #5eead4, #2dd4bf)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#050b18",
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
              color: "#94a3b8",
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
              color: "#5eead4",
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
              color: "#f1f5f9",
              display: "flex",
            }}
          >
            Lovepreet Kaur
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#5eead4",
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
              color: "#94a3b8",
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
              color: "#64748b",
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
