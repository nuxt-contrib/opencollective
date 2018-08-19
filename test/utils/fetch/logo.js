import test from 'ava'
import { fetchLogo } from '../../../src/utils/fetch'
import { spyOnConsola } from '../../_helpers'
import fetchMock from 'fetch-mock'

test.beforeEach(spyOnConsola)

test.afterEach(t => {
  fetchMock.restore()
})

test.serial('it will silently return when no logoUrl is specified', async t => {
  try {
    const emptyLogoResult = await fetchLogo('')
    t.is(emptyLogoResult, undefined)
  } catch (e) {
    t.fail()
  }
  t.false(t.context.consola.called)
})

test.serial('it will throw an error if logoUrl malformed', async t => {
  const errorMessage = 'Your logo URL isn\'t well-formatted - noniceurl:('
  await t.throwsAsync(async () => fetchLogo('noniceurl:('), { message: errorMessage })
  t.is(t.context.consola.callCount, 1)
  t.true(t.context.consola.firstCall.lastArg.message.startsWith(errorMessage))
})

test.serial('it will throw an error if logo can\'t be fetched from url', async t => {
  fetchMock.mock('*', { throws: 'error' })

  const url = 'https://fails.com'
  const errorMessage = `Error while fetching logo from ${url}`

  const emptyLogoResult = await t.notThrowsAsync(async () => fetchLogo(url))

  t.is(undefined, emptyLogoResult)
  t.is(t.context.consola.callCount, 1)
  t.is(t.context.consola.firstCall.lastArg.message, errorMessage)
})

test.serial('it will throw an error if logo response is malformed', async t => {
  fetchMock.mock('*', 500)

  const url = 'https://fails.com'
  const errorMessage = `Error while fetching logo from ${url}. The response wasn't well-formatted`

  const emptyLogoResult = await t.notThrowsAsync(async () => fetchLogo(url))

  t.is(undefined, emptyLogoResult)
  t.is(t.context.consola.callCount, 1)
  t.is(t.context.consola.firstCall.lastArg.message, errorMessage)
})
