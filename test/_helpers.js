import { spy } from 'sinon'
import consola from 'consola'
import path from 'path'

export const spyOnConsola = t => {
  t.context.consola = spy()
  consola.clear().add({
    log: t.context.consola
  })
}

export const pkgPaths = {
  full: path.resolve('test/fixtures/package-full'),
  noLogo: path.resolve('test/fixtures/package-no-logo'),
  noUrl: path.resolve('test/fixtures/package-no-url'),
  none: path.resolve('test/fixtures/package-none'),
  parent: path.resolve('test/fixtures/package-parent')
}
