/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  devIndicators: false,
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseScriptSrc = [
      "'self'",
      "'unsafe-inline'",
      'https://va.vercel-scripts.com',
      ...(!isProduction ? ["'unsafe-eval'"] : [])
    ].join(' ');
    const sqlLearningScriptSrc = [
      baseScriptSrc,
      "'wasm-unsafe-eval'"
    ].join(' ');
    const connectSrc = [
      "'self'",
      'https:',
      ...(!isProduction ? ['http:', 'ws:', 'wss:'] : [])
    ].join(' ');

    const buildContentSecurityPolicy = (scriptSrc) => [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src ${scriptSrc}`,
      `connect-src ${connectSrc}`,
      ...(isProduction ? ['upgrade-insecure-requests'] : [])
    ].join('; ');

    const securityHeaders = (contentSecurityPolicy) => [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
      { key: 'Content-Security-Policy', value: contentSecurityPolicy },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'off' }
    ];

    return [
      {
        source: '/sql-learning/:path*',
        headers: securityHeaders(buildContentSecurityPolicy(sqlLearningScriptSrc))
      },
      {
        source: '/((?!sql-learning(?:/|$)).*)',
        headers: securityHeaders(buildContentSecurityPolicy(baseScriptSrc))
      }
    ];
  }
};

export default nextConfig;
