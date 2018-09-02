import test from 'ava'
import { stub } from 'sinon'
import childProcess from 'child_process'
import { retrieveCols } from '../../../src/utils/print'

test('retrieveCols returns default value when execSync is Numeric', t => {
  const result = 160
  const execStub = stub(childProcess, 'execSync').returns(result)
  t.is(retrieveCols(), result)
  execStub.restore()
})
