/* eslint-disable no-console */
/* eslint-disable no-control-regex */
import { execSync } from 'child_process'
import chalk from 'chalk'
import { formatMoney, isWin32 } from './misc'

export const print = (color = null) => (str = '') => {
  const terminalCols = retrieveCols()
  const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length
  const leftPaddingLength = Math.floor((terminalCols - strLength) / 2)
  const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0))
  if (color) {
    str = chalk[color](str)
  }

  console.log(leftPadding, str)
}

export const retrieveCols = (() => {
  let result = false

  return () => {
    if (result) {
      return result
    }
    const defaultCols = 80
    try {
      const terminalCols = execSync(`tput cols`, { stdio: ['pipe', 'pipe', 'ignore'] })
      result = parseInt(terminalCols.toString()) || defaultCols
    } catch (e) {
      result = defaultCols
    }
    return result
  }
})()

export const printStats = (stats, color) => {
  if (!stats) {
    return
  }

  const colored = print(color)
  const bold = print('bold')

  const formatWithCurrency = formatMoney(stats.currency)

  colored(`Number of contributors: ${stats.contributorsCount}`)
  colored(`Number of backers: ${stats.backersCount}`)
  colored(`Annual budget: ${formatWithCurrency(stats.yearlyIncome)}`)
  bold(`Current balance: ${formatWithCurrency(stats.balance)}`, 'bold')
}

export const printLogo = logoText => {
  if (!logoText) {
    return
  }

  logoText.split('\n').forEach(print('blue'))
}

/**
 * Only show emoji on OSx (Windows shell doesn't like them that much ¯\_(ツ)_/¯ )
 * @param {*} emoji
 */
export const emoji = emoji => process.stdout.isTTY && !isWin32 ? emoji : ''

export function printFooter (collective) {
  const dim = print('dim')
  const yellow = print('yellow')
  const emptyLine = print()

  yellow(`Thanks for installing ${collective.slug} ${emoji('🙏')}`)
  dim(`Please consider donating to our open collective`)
  dim(`to help us maintain this package.`)
  emptyLine()
  printStats(collective.stats)
  emptyLine()
  print()(`${chalk.bold(`${emoji('👉 ')} ${collective.donationText}`)} ${chalk.underline(collective.donationUrl)}`)
  emptyLine()
}
