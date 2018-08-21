import test from 'ava'
import { fetchStats } from '../../../src/utils/fetch'
import fetchMock from 'fetch-mock'
import { spyOnConsola } from '../../_helpers'

test.beforeEach(spyOnConsola)

test.afterEach(t => {
  fetchMock.restore()
})

test.serial('it can fetch stats', async t => {
  const responseObject = {
    'slug': 'nuxtjs',
    'currency': 'USD',
    'image': 'https://opencollective-production.s3-us-west-1.amazonaws.com/251e1a10-369b-11e7-8ad6-5967d7493bb7.png',
    'balance': 435949,
    'yearlyIncome': 2528815,
    'backersCount': 110,
    'contributorsCount': 129
  }
  fetchMock.mock('*', responseObject)
  try {
    const stats = await fetchStats('https://opencollective.com/fakecollective')
    t.deepEqual(stats, responseObject)
  } catch (e) {
    t.fail()
  }
  fetchMock.restore()
})

test.serial('it throws error when receiving invalid json while fetching stats', async t => {
  const responseObject = 'oh no! It\'s no JSON'
  fetchMock.mock('*', responseObject)
  try {
    const stats = await fetchStats('https://opencollective.com/fakecollective')
    t.is(stats, undefined)
    t.is(t.context.consola.firstCall.lastArg.message, 'FetchError: invalid json response body at https://opencollective.com/fakecollective.json reason: Unexpected token o in JSON at position 0')
    t.is(t.context.consola.secondCall.lastArg.message, 'Could not load the stats for fakecollective')
  } catch (e) {
    t.fail()
  }
})

test.serial('it throws error when cannot connect to url while fetching stats', async t => {
  fetchMock.mock('*', { throws: 'error' })
  try {
    const stats = await fetchStats('https://opencollective.com/fakecollective')
    t.is(stats, undefined)
    t.is(t.context.consola.firstCall.lastArg.message, 'error')
    t.is(t.context.consola.secondCall.lastArg.message, 'Could not fetch https://opencollective.com/fakecollective.json')
  } catch (e) {
    t.fail()
  }
})
