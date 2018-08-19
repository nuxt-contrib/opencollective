import { hideMessage } from '../../../src/utils/misc'
import test from 'ava'

function tHideMessage (t, input, expected) {
  t.is(input ? hideMessage(input) : hideMessage(), expected)
}

tHideMessage.title = (providedTitle, input, expected) => {
  const prefix = `${expected ? 'Hide' : 'Show'} message when`
  if (!input) {
    return `${prefix} no input is provided`
  }
  const keyCount = Object.keys(input).length
  const key = keyCount ? Object.keys(input)[0] : 'empty object'
  const value = keyCount ? input[key] : 'given'
  return `${prefix} ${key} is ${value}`.trim()
}

test(tHideMessage, {}, false)
test(tHideMessage, false, true)
test(tHideMessage, {OC_POSTINSTALL_TEST: true}, true)
test(tHideMessage, {OPENCOLLECTIVE_HIDE: true}, true)
test(tHideMessage, {CI: true}, true)
test(tHideMessage, {CONTINUOUS_INTEGRATION: true}, true)
test(tHideMessage, {NODE_ENV: 'production'}, true)
test(tHideMessage, {NODE_ENV: 'dev'}, false)
test(tHideMessage, {NODE_ENV: 'development'}, false)
