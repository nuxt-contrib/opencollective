import { init } from './init'
import { hideMessage } from './utils/misc'

if (!hideMessage()) {
  const path = process.argv.length > 2 ? process.argv[2] : '.'

  ;(async () => {
    await init(path)
  })()
}
