import test from 'ava'
import { retrieveDonationSlug } from '../../../src/utils/transforms'

test('donation slug returns default slug if none provided', t => {
  const pkgWithoutSlug = { collective: { donation: {} } }
  t.is(retrieveDonationSlug(pkgWithoutSlug), 'donate')

  const pkgWithoutDonation = { collective: {} }
  t.is(retrieveDonationSlug(pkgWithoutDonation), 'donate')
})
