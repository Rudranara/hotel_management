import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #F43F5E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 14,
          color: "#0F172A",
          letterSpacing: "-0.5px",
        }}
      >
        H4
      </div>
    ),
    { ...size }
  );
}
