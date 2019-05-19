import React from 'react'
import Footer from './Footer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Footer />', () => {
  it('should render Footer', () => {
    shallow(<Footer />)
  })
})
