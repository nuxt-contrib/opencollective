import fetch from 'node-fetch'
import { printFooter, printLogo } from './utils/print'
import { getCollective } from './utils/transforms'

export const init = async path => {
  global.fetch = global.fetch || fetch
  const collective = await getCollective(path)

  printLogo(collective.logo)
  printFooter(collective)
}
