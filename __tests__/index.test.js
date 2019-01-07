/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import Link from 'next/link'

import Home from '../pages/index.js'

import Router from 'next/router'
const mockedRouter = { push: () => {}, prefetch: () => {} }
Router.router = mockedRouter

describe('With Enzyme', () => {
  it('Home shows 3 Cards each with a Link', () => {
    const wrap = shallow(<Home />)
    expect(wrap.find('a.card').length).toBe(3)
    expect(wrap.find(Link).length).toBe(3)
  })
})

describe('With Snapshot Testing', () => {
  it('Home shows 3 cards', () => {
    const component = renderer.create(<Home />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
