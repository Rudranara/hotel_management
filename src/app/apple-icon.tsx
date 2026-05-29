import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #F43F5E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 72,
          color: "#0F172A",
          letterSpacing: "-2px",
        }}
      >
        H4
      </div>
    ),
    { ...size }
  );
}
