import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sepia from 'sepia'

import Router from 'next/router'
const mockedRouter = { push: () => {}, prefetch: () => {} }
Router.router = mockedRouter

process.env.VCR_MODE='record'

configure({ adapter: new Adapter() })
