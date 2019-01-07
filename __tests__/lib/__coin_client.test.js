/* eslint-env jest */

import ChainAPI from '../../lib/chain_api'

describe('with blank constructor params', async () => {
  it('throws an errpr when not provided a hash', async () => {
    let subject = new ChainAPI()
    expect.assertions(1)
    try {
      await subject.getBlock()
    } catch (err) {
      expect(err.message).toEqual('Block Hash Required')
    }
  })
})
