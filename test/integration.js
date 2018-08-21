import test from 'ava'
import { pkgPaths } from './_helpers'
import { exec } from 'child_process'
import fetchMock from 'fetch-mock'
import { promisify } from 'util'
import { init } from '../src/init'
import fetch from 'node-fetch'

test.serial('it prints everything', async t => {
  const logo = 'You are beautiful!'
  const stats = {
    'slug': 'nuxtjs',
    'currency': 'USD',
    'image': 'https://opencollective-production.s3-us-west-1.amazonaws.com/251e1a10-369b-11e7-8ad6-5967d7493bb7.png',
    'balance': 435949,
    'yearlyIncome': 2528815,
    'backersCount': 110,
    'contributorsCount': 129
  }

  // Assign as the assignment in init happens after mocking
  global.fetch = fetch
  fetchMock.mock('https://opencollective.com/fake.json', stats)
  fetchMock.mock('https://opencollective.com/fake/logo.txt?reverse=true&variant=variant2', {
    body: logo,
    headers: { 'content-type': 'text/plain' }
  })

  let log = ''
  process.stdout.write = (write => function (string, encoding, fileDescriptor) {
    log += string
    write.apply(process.stdout, arguments)
  })(process.stdout.write)

  await init(pkgPaths.full)

  t.snapshot(log)
})

test.serial('it runs the postinstall script after npm install', async t => {
// eslint-disable-next-line handle-callback-err
  const { stdout: rawStdout } = await promisify(exec)('npm install', {
    cwd: pkgPaths.full,
    env: Object.assign(process.env, { NODE_ENV: 'dev' })
  })
  const stdout = rawStdout.toString('utf8').split('\n').slice(9, 13).join('\n')
  t.snapshot(stdout)
})
