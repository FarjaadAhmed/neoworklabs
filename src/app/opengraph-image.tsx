import { ImageResponse } from "next/og";
import { CONTENT } from "@/config/content";

export const alt = CONTENT.site.title;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 20% 20%, rgba(97,194,70,0.3), transparent 50%), #05080d",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>
          neowork labs<span style={{ color: "#61c246" }}>.</span>
        </div>
        <div style={{ marginTop: 32, fontSize: 36, color: "rgba(255,255,255,0.75)" }}>
          {CONTENT.services.items.map((s) => s.title).join("  ·  ")}
        </div>
      </div>
    ),
    size
  );
}
