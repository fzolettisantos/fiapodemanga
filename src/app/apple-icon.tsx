import { ImageResponse } from "next/og";
import { ProvisionalMonogram } from "@/lib/seo/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<ProvisionalMonogram size={180} />, size);
}
