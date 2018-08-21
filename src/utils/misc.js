import consola from 'consola'

export const reportAndThrowError = msg => {
  report(msg)
  throw new Error(msg)
}

export const report = msg => {
  consola.withScope('nuxt-opencollective').fatal(msg)
}

export const hideMessage = (env = process.env) => {
  // Show message if it is forced
  if (env.OPENCOLLECTIVE_FORCE) {
    return false
  }

  // Don't show after oracle postinstall
  if (env.OC_POSTINSTALL_TEST) {
    return true
  }
  // Don't show if opted-out
  if (env.OPENCOLLECTIVE_HIDE) {
    return true
  }

  // Don't show if on CI
  if (env.CI || env.CONTINUOUS_INTEGRATION) {
    return true
  }

  // Only show in dev environment
  return Boolean(env.NODE_ENV) && !['dev', 'development'].includes(env.NODE_ENV)
}

export const formatMoney = currency => amount => {
  amount = amount / 100 // converting cents

  const precision = 0

  return amount.toLocaleString(currency, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
}

export const isWin32 = process.platform === 'win32'

export const stripLeadingSlash = s => s.startsWith('/') ? s.substring(1) : s
export const stripTrailingSlash = s => s.endsWith('/') ? s.slice(0, -1) : s
