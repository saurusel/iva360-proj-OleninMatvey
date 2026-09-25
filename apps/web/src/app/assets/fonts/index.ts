import localFont from 'next/font/local'

export const inter = localFont({
  src: [
    { path: './Inter-Regular.woff2', weight: '400' },
    { path: './Inter-Medium.woff2', weight: '500' },
    { path: './Inter-SemiBold.woff2', weight: '600' },
    { path: './Inter-Bold.woff2', weight: '700' },
  ],
  variable: '--font-inter',
})

export const guarujaNeue = localFont({
  src: [
    { path: './GuarujaNeue-Medium.woff2', weight: '500' },
    { path: './GuarujaNeue-SemiBold.woff2', weight: '600' },
    { path: './GuarujaNeue-Bold.woff2', weight: '700' },
  ],
  variable: '--font-guaruja-neue',
  declarations: [
    { prop: 'ascent-override', value: '82%' },
    { prop: 'descent-override', value: '18%' },
    { prop: 'line-gap-override', value: '0%' },
  ],
})
