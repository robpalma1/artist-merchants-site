/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
    ],
  },
  typescript: {
    // Vercel builds (production and preview) skip type errors; local builds still check
    ignoreBuildErrors: Boolean(process.env.VERCEL_ENV),
  },
  eslint: {
    // Vercel builds (production and preview) skip lint errors; local builds still check
    ignoreDuringBuilds: Boolean(process.env.VERCEL_ENV),
  },
}

export default config
