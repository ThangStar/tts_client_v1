/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: "/tts-client",
    // output: "export",
    images: {
        domains: ['api.vietqr.io', 'i.pravatar.cc']
    },
    compiler:{
        // removeConsole: true
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false,
        };
        return config;
    },
};

export default nextConfig;
