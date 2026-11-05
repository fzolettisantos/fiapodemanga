import { ImageResponse } from "next/og";
import { ProvisionalMonogram } from "@/lib/seo/brand-image";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<ProvisionalMonogram size={64} />, size);
}
