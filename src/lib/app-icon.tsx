import { ImageResponse } from "next/og";

const NAVY_DARK = "#0b1120";
const NAVY_LIGHT = "#1b2436";

export function renderAppIcon({ size, maskable = false }: { size: number; maskable?: boolean }) {
  const padding = maskable ? size * 0.24 : size * 0.12;
  const fontSize = size * 0.38;

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${NAVY_LIGHT} 0%, ${NAVY_DARK} 100%)`,
          borderRadius: maskable ? 0 : Math.round(size * 0.22)
        }}
      >
        <div
          style={{
            display: "flex",
            width: size - padding * 2,
            height: size - padding * 2,
            alignItems: "center",
            justifyContent: "center",
            fontSize,
            fontWeight: 700,
            color: "#f8fafc"
          }}
        >
          LW
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
