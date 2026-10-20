import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: connected hardware, from first schematic to field-ready product`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 75% 40%, rgba(197,242,92,0.22), transparent 45%), #0a0c0c",
          color: "#ecebe4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#a7aba3" }}>[ STRUCTRA INNOVATIONS ]</div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>
          Hardware that senses, decides and acts.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#c5f25c" }}>Embedded design · IoT firmware · Radon Sentinel</div>
      </div>
    ),
    size,
  );
}
