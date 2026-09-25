import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { NextConfig } from 'next'

import { loadRootEnv } from '@iva360/shared/env'
import { parseWebEnv } from '@iva360/shared/schemas'

loadRootEnv()

const { CMS_INTERNAL_URL, CMS_PUBLIC_URL } = parseWebEnv()
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { svgo: false },
          },
        ],
        as: '*.js',
      },
    },
  },
  transpilePackages: ['@iva360/shared'],
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule: { test?: { test?: (value: string) => boolean } }) => rule.test?.test?.('.svg'),
    ) as { exclude?: RegExp } | undefined

    if (assetRule) {
      assetRule.exclude = /\.svg$/i
    }

    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgo: false },
        },
      ],
    })

    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],

    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/icons/**' }],
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: `${CMS_PUBLIC_URL ?? CMS_INTERNAL_URL}/admin/:path*`,
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${CMS_INTERNAL_URL}/api/:path*` }]
  },
}

export default nextConfig
