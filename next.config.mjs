/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverComponentsExternalPackages: ["pino", "pino-pretty","pino-roll"],
    },
};

export default nextConfig;
