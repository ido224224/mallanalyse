/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // ESLint 검사를 빌드 과정에서 비활성화
      ignoreDuringBuilds: true,
    },
  }
  
  module.exports = nextConfig