#!/usr/bin/env node

require('../dist/opencollective.cjs')
  .init(process.argv.length > 2 ? process.argv[2] : '.')
  .catch(process.exit(1))
