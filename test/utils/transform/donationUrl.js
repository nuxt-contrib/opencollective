import test from 'ava'
import { collectiveDonationUrl } from '../../../src/utils/transforms'

test('donation url returns default if no slug is provided', t => {
  const pkgWithoutDonation = { collective: { url: 'https://example.com/' } }
  t.is(collectiveDonationUrl(pkgWithoutDonation), 'https://example.com/donate')

  const pkgWithoutDonationUrl = { collective: { url: 'https://example.com/', donation: {} } }
  t.is(collectiveDonationUrl(pkgWithoutDonationUrl), 'https://example.com/donate')
})
