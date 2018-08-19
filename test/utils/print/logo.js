import test from 'ava'
import { spy } from 'sinon'
import * as print from '../../../src/utils/print'

test.beforeEach(t => {
  t.context.print = spy(print, 'print')
})

test.afterEach(t => {
  t.context.print.restore()
})

test('print nothing if logoText is false', t => {
  t.is(print.printLogo(false), undefined)

  t.false(t.context.print.called)
})
