/** @type {import('next').NextConfig} */

import pwa from "@ducanh2912/next-pwa"

const withPWA = pwa({
    dest: "public",
    reloadOnOnline: true,
    aggressiveFrontEndNavCaching: true,
    cacheOnFrontEndNav: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true,
    }
})

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.supa_url,
                pathname: "/storage/v1/**",
                port: ""
            }
        ]
    }
};

export default withPWA(nextConfig);
