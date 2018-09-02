import { reportAndThrowError, stripLeadingSlash, stripTrailingSlash } from './misc'
import { fetchLogo, fetchPkg, fetchStats } from './fetch'

export const collectiveSlugFromUrl = url => url.substr(url.lastIndexOf('/') + 1).toLowerCase().replace(/\.json/g, '')

export const collectiveUrl = pkg => {
  const url = pkg.collective && pkg.collective.url

  if (!url) {
    reportAndThrowError('No collective URL set!')
  }

  return stripTrailingSlash(url)
}

// use pkg.collective.logo for "legacy"/compatibility reasons
export const collectiveLogoUrl = pkg => pkg.collective.logo || pkg.collective.logoUrl || false

export const collectiveDonationText = pkg => (pkg.collective.donation && pkg.collective.donation.text) || 'Donate:'

export const getCollective = async pkgPath => {
  const pkg = fetchPkg(pkgPath)
  const url = collectiveUrl(pkg)
  const baseCollective = {
    url,
    slug: collectiveSlugFromUrl(url),
    logoUrl: collectiveLogoUrl(pkg),
    donationUrl: collectiveDonationUrl(pkg),
    donationText: collectiveDonationText(pkg)
  }
  const logoUrl = baseCollective.logoUrl
  const promises = [fetchStats(url)].concat(logoUrl ? fetchLogo(logoUrl) : [])

  const [stats, logo] = await Promise.all(promises)

  return Object.assign(baseCollective, { stats, logo })
}

export const collectiveDonationUrl = pkg => {
  const defaultDonationAmount = pkg.collective.donation && pkg.collective.donation.amount

  let donateUrl = `${collectiveUrl(pkg)}/${retrieveDonationSlug(pkg)}`

  if (defaultDonationAmount) {
    return `${donateUrl}/${defaultDonationAmount}`
  }

  return donateUrl
}

export const retrieveDonationSlug = pkg => {
  const rawDonationSlug = (pkg.collective.donation && pkg.collective.donation.slug)

  if (!rawDonationSlug) {
    return 'donate'
  }

  return stripLeadingSlash(rawDonationSlug)
}
