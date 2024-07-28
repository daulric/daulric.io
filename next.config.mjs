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
    
};

export default withPWA(nextConfig);
