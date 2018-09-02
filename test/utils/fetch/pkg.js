import test from 'ava'
import path from 'path'
import { fetchPkg } from '../../../src/utils/fetch'
import { pkgPath, spyOnConsola } from '../../_helpers'

test.beforeEach(spyOnConsola)

test.serial('it can fetch pkg', async t => {
  try {
    await fetchPkg(pkgPath)
  } catch (e) {
    t.fail()
  }
  t.false(t.context.consola.called)
})

test.serial('it throws an error if pkg is not available', t => {
  const errorString = `Could not find package.json at ${path.resolve('test')}/package.json`
  t.throws(() => fetchPkg(path.resolve('test')), { message: errorString })

  t.is(t.context.consola.callCount, 1)
  t.is(t.context.consola.firstCall.lastArg.message, errorString)
})
