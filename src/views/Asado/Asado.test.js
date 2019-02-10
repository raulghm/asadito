import React from 'react'
import Asado from './Asado'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Asado />', () => {
  it('should render Asado', () => {
    shallow(<Asado />)
  })
})
