#!/usr/bin/env node

require('../dist/opencollective.cjs')
  .init(process.argv.length > 2 ? process.argv[2] : '.')
  .catch(console.error) // eslint-disable-line no-console
