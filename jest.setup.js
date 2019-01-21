import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sepia from 'sepia'

import Router from 'next/router'
const mockedRouter = { push: () => {}, prefetch: () => {} }
Router.router = mockedRouter

jest.setTimeout(5000); // needed when not using sepia cache

process.env.VCR_MODE='record'

configure({ adapter: new Adapter() })
