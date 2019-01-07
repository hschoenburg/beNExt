/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import Block from '../components/block.js'
import ChainAPI from '../lib/chain_api'
jest.mock('../lib/chain_api')

describe('Without valid props', async () => {
  it.only('sets state.error', async () => {
    const wrap = mount(<Block />)
    await wrap.instance().componentDidMount()
    expect(wrap.state('error').message).toEqual('Block Hash Required')
  })
})

describe('With block hash prop', async () => {
  beforeEach(() => {
    ChainAPI.mockClear()
  })

  it.only('calls client.getBlock', async () => {
    const wrap = mount(<Block hash={'hash'} />)
    await wrap.instance().componentDidMount()
    expect(ChainAPI).toHaveBeenCalledTimes(1)
    const mockC = ChainAPI.mock.instances[0]
    const mockBlock = mockC.getBlock
    expect(mockBlock.mock.calls[0][0]).toEqual('hash')
  })
})
