import * as tailwindPlugin from 'prettier-plugin-tailwindcss'
import { readFileSync } from 'node:fs'

const rootConfig = JSON.parse(
  readFileSync(new URL('../../.prettierrc.json', import.meta.url), 'utf8'),
)

const config = {
  ...rootConfig,
  plugins: [tailwindPlugin],
  tailwindStylesheet: './src/app/assets/css/globals.css',
  tailwindFunctions: ['cn', 'cva'],
}

export default config
