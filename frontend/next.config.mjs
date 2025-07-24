/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // ISR을 위한 설정
  experimental: {
    isrMemoryCacheSize: 0, // ISR 캐시 비활성화 (개발 중)
  },
  // 정적 생성 최적화
  trailingSlash: false,
  generateEtags: false,
}

export default nextConfig
