import path from 'path'
import { spy } from 'sinon'
// eslint-disable-next-line import/named
import { consola } from 'consola'

export const spyOnConsola = (t) => {
  t.context.consola = spy()
  consola.mockTypes(() => t.context.consola)
}

export const pkgPath = path.resolve('test/fixtures/package-full')
