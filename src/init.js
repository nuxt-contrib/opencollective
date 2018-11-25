import fetch from 'node-fetch'
import { printFooter, printLogo } from './utils/print'
import { getCollective } from './utils/transforms'
import { hideMessage } from './utils/misc'

export async function init (path, hide = hideMessage()) {
  global.fetch = global.fetch || fetch
  const collective = await getCollective(path)

  printLogo(collective.logo)
  printFooter(collective)
}
