import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FundMyCampus — Education Loans for Study Abroad & India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          position: "relative",
        }}
      >
        {/* Subtle teal accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#0D9488",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {/* F icon */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path
              d="M10 65V15C10 12 12 10 15 10h25c3 0 5 2 5 5v8c0 3-2 5-5 5H28v10h12c3 0 5 2 5 5v8c0 3-2 5-5 5H28v14c0 3-2 5-5 5h-8c-3 0-5-2-5-5z"
              fill="#0D9488"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 700 }}>
            <span style={{ color: "#0A0A0A" }}>Fundmy</span>
            <span style={{ color: "#0D9488" }}>campus</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#666666",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Education Loans for Study Abroad & India
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 50,
            padding: "20px 40px",
            backgroundColor: "#F0FDFA",
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#0D9488" }}>15,000+</span>
            <span style={{ fontSize: 14, color: "#666" }}>Students Funded</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#0D9488" }}>6.75%</span>
            <span style={{ fontSize: 14, color: "#666" }}>Starting Rate</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#0D9488" }}>48 Hrs</span>
            <span style={{ fontSize: 14, color: "#666" }}>Approval Time</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#0D9488" }}>50+</span>
            <span style={{ fontSize: 14, color: "#666" }}>Countries</span>
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 16,
            color: "#999",
          }}
        >
          www.fundmycampus.com
        </div>
      </div>
    ),
    { ...size }
  );
}
