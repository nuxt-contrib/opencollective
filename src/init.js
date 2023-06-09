import { fetch } from 'node-fetch-native'
import { printFooter, printLogo } from './utils/print'
import { getCollective } from './utils/transforms'
import { hideMessage } from './utils/misc'

export async function init (path, hide = hideMessage()) {
  if (hide) {
    return
  }

  global.fetch = global.fetch || fetch
  const collective = await getCollective(path)

  printLogo(collective.logo)
  printFooter(collective)
}
