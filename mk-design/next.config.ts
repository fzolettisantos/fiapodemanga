import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // O repositório pai contém outro projeto com seu próprio lockfile; fixa a raiz aqui.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
