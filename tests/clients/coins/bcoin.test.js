/* eslint-env jest */

// could probably be collapsed with bitcore.test.js
//

import BCoinClient from '../../../clients/coins/bcoin'

describe('hsd getHeight', async () => {
  it('returns blockheight', async () => {
    let subject = new BCoinClient({coin: 'hsd'})
    let height = await subject.getHeight()
    expect(height).toBeGreaterThan(0)
  })
})

describe('getBlocks', async () => {
  it.only('returns array of 10 blocks', async () => {
    let subject = new BCoinClient({coin: 'btc'})
    let blocks = await subject.getBlocks()
    expect(blocks.length).toBeGreaterThan(0)
    expect(blocks[0].previousblockhash).toEqual(blocks[1].hash)
  })
})
