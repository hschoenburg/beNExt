/* eslint-env jest */

import BitCoreClient from '../../../clients/coins/bitcore'

describe('btc getHeight', async () => {
  it('returns blockheight', async () => {
    let subject = new BitCoreClient({coin: 'btc'})
    let height = await subject.getHeight()
    expect(height).toBeGreaterThan(0)
  })
})

describe('getBlocks', async () => {
  it('returns array of 10 blocks', async () => {
    let subject = new BitCoreClient({coin: 'btc'})
    let blocks = await subject.getBlocks()
    expect(blocks.length).toBeGreaterThan(0)
    expect(blocks[0].previousblockhash).toEqual(blocks[1].hash)
  })
})
