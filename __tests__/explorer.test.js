/* eslint-env jest */

import { shallow, mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Explorer from '../pages/explorer/index.js'

let testProps = {
  type: 'height',
  term: 444,
  history: []
}

describe('Initial Render', () => {
  it('correctly renders when passed type+term props', () => {
    const wrap = mount(<Explorer {...testProps} />)
    expect(wrap.find('.focus').childAt(0).text()).toEqual('Height: 444')
  })
})

describe('focusExplorer', () => {
  it.only('should not update history if type+term are already in history', () => {
    let subject = mount(<Explorer {...testProps} />)
    subject.instance().focusExplorer(null, testProps)
    let history = subject.state('history').slice()
    subject.instance().focusExplorer(null, testProps) // run twice 
    let newHistory = subject.state('history').slice()
    expect(newHistory).toEqual(history)
  })

  it('should update state if type+term are new', () => {
    let newProps = {
      type: 'address',
      term: '0xsjhdfbsjhb'
    }
    let subject = mount(<Explorer {...testProps} />)
    let history = subject.state('history').slice()
    subject.instance().focusExplorer(null, newProps)
    let newHistory = subject.state().history

    expect(newHistory).not.toEqual(history)
    expect(newHistory[0].type).toEqual('height')
    expect(subject.state().type).toEqual('address')
  })
})

describe('shallow Home render', () => {
  it('Home shows 3 rows', () => {
    const wrap = shallow(<Explorer />)
    expect(wrap.find('div.row').length).toBe(3)
    expect(wrap.find('div.hero').length).toBe(1)
    // expect(wrap.find(Link).length).toBe(3)
  })
})

describe('Index snapshot', () => {
  it('Explorer shows 3 rows', () => {
    const component = renderer.create(<Explorer />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
