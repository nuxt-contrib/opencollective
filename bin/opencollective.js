#!/usr/bin/env node
const path = require('node:path')

const targetPath = process.argv.length > 2 ? process.argv[2] : '.'
const cwd = process.cwd()
const resolvedPath = path.resolve(cwd, targetPath)

if (resolvedPath !== cwd && !resolvedPath.startsWith(cwd + path.sep)) {
  console.error(`Invalid path argument: "${targetPath}" resolves outside of the current working directory`)
  process.exit(1)
}

require('../dist/index.js')
  .init(resolvedPath)
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
