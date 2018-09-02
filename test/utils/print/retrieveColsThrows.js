import test from 'ava'
import { stub } from 'sinon'
import childProcess from 'child_process'
import { retrieveCols } from '../../../src/utils/print'

test('retrieveCols returns default value when execSync throws', t => {
  const execStub = stub(childProcess, 'execSync').throws('ABC')
  t.is(retrieveCols(), 80)
  execStub.restore()
})
