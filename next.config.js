/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态页面压缩
  compress: true,

  // 图片优化
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // HTTP 缓存头 — 静态资源长期缓存，页面短期缓存
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "DENY" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // JS / CSS / fonts — 静态资源永久缓存
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // 换算页面 — 缓存 1 天（内容不变）
        source: "/:category/:conversion",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
