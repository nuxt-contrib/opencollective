import test from 'ava'
import { collectiveUrl } from '../../../src/utils/transforms'
import { spyOnConsola } from '../../_helpers'

test.beforeEach(spyOnConsola)

test('throws error and kills process if not present', t => {
  const errorMessage = 'No collective URL set!'
  const pkgWithoutUrl = { collective: {} }

  t.throws(() => collectiveUrl(pkgWithoutUrl), errorMessage)
  t.is(t.context.consola.firstCall.lastArg.message, errorMessage)

  const emptyPkg = {}

  t.throws(() => collectiveUrl(emptyPkg), errorMessage)
  t.is(t.context.consola.firstCall.lastArg.message, errorMessage)
})
