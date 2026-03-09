// app/api/og/route.tsx
// Generates dynamic OG images for each conversion page
// Usage: /api/og?from=mile&to=kilometer&category=length&value=100
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const from     = searchParams.get("from")     || "mile";
  const to       = searchParams.get("to")       || "kilometer";
  const category = searchParams.get("category") || "length";
  const value    = searchParams.get("value")    || "";
  const result   = searchParams.get("result")   || "";

  const title = value && result
    ? `${value} ${from} = ${result} ${to}`
    : `${from} to ${to} converter`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px",
          background: "#f7f5f2",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#1a1814", letterSpacing: "-1px" }}>
            Koverts
          </span>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3d6b4f" }} />
          <span style={{ fontSize: "14px", color: "#9a948a", fontFamily: "monospace" }}>
            {category} converter
          </span>
        </div>

        {/* Main answer */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: "20px", color: "#9a948a", fontFamily: "monospace" }}>
            {value ? `${value} ${from} =` : `1 ${from} =`}
          </span>
          <span style={{ fontSize: "80px", fontWeight: 800, color: "#3d6b4f", lineHeight: 1, letterSpacing: "-3px" }}>
            {result || "?"}
          </span>
          <span style={{ fontSize: "36px", fontWeight: 600, color: "#1a1814" }}>
            {to}
          </span>
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute", bottom: "60px", left: "100px", right: "100px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: "14px", color: "#9a948a", fontFamily: "monospace" }}>
            koverts.com
          </span>
          <span style={{ fontSize: "13px", color: "#c5bdb4", fontFamily: "monospace" }}>
            Free · No signup · 6 languages
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
