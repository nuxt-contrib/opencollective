import { spy } from 'sinon'
import consola from 'consola'
import path from 'path'

export const spyOnConsola = t => {
  t.context.consola = spy()
  consola.clear().add({
    log: t.context.consola
  })
}

export const pkgPath = path.resolve('test/fixtures/package-full')
