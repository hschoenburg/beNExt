/* eslint-env jest */

import BCoinClient from '../../../clients/coins/bcoin'

describe('getHeight', async () => {
  it.only('returns blockheight', async () => {
    let subject = new BCoinClient({coin: 'hsd'})
    let height = await subject.getHeight()
    expect(height).toBeGreaterThan(0)
  })
})
