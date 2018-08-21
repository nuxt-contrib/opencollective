import path from 'path'
import fs from 'fs'
import { collectiveSlugFromUrl } from './transforms'
import { report, reportAndThrowError } from './misc'

const fetchJson = async url => {
  try {
    return (await global.fetch(`${url}.json`)).json()
  } catch (e) {
    report(e)
    reportAndThrowError(`Could not fetch ${url}.json`)
  }
}

export const fetchStats = async collectiveUrl => {
  try {
    return await fetchJson(collectiveUrl)
  } catch (e) {
    report(e)
    report(`Could not load the stats for ${collectiveSlugFromUrl(collectiveUrl)}`)
  }
}

export const fetchLogo = async logoUrl => {
  if (!logoUrl) {
    // Silent return if no logo has been provided
    return
  }
  if (!logoUrl.match(/^https?:\/\//)) {
    reportAndThrowError(`Your logo URL isn't well-formatted - ${logoUrl}`)
  }

  try {
    const res = (await global.fetch(logoUrl))
    if (isLogoResponseWellFormatted(res)) {
      return res.text()
    }
    report(`Error while fetching logo from ${logoUrl}. The response wasn't well-formatted`)
  } catch (e) {
    report(`Error while fetching logo from ${logoUrl}`)
  }
}

const isLogoResponseWellFormatted = res => res.status === 200 && res.headers.get('content-type').match(/^text\/plain/)

export const fetchPkg = pathToPkg => {
  const fullPathToPkg = path.resolve(`${pathToPkg}/package.json`)
  try {
    return JSON.parse(fs.readFileSync(fullPathToPkg, 'utf8'))
  } catch (e) {
    reportAndThrowError(`Could not find package.json at ${fullPathToPkg}`)
  }
}
