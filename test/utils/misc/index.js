import test from 'ava'
import { stripLeadingSlash, stripTrailingSlash } from '../../../src/utils/misc'

test('stripLeadingSlash', t => {
  t.is(stripLeadingSlash('/test'), 'test')
  t.is(stripLeadingSlash('test'), 'test')
})

test('stripTrailingSlash', t => {
  t.is(stripTrailingSlash('test/'), 'test')
  t.is(stripTrailingSlash('test/'), 'test')
})
