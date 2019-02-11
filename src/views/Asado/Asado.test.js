import React from 'react'
import Asado from './Asado'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<Asado /> shallow rendering', () => {
  it('should render Asado', () => {
    shallow(<Asado />)
  })
  it('on input change show budget and result', () => {
    const wrapper = shallow(<Asado />)

    const input = wrapper.find('.Asado-select--users input').first()
    input.simulate('change', { target: { value: '1' } })
    expect(wrapper.find('.Asado-select--budgets').length).toBe(1)

    const select = wrapper.find('.Asado-input select').first()
    select.simulate('change', { target: { value: 0 } })
    expect(wrapper.find('.Asado-select--results').length).toBe(1)
  })
})

describe('<Asado /> mount rendering', () => {
  it('should render Asado', () => {
    mount(<Asado />)
  })
  it('h2 contains correct text', () => {
    const wrapper = mount(<Asado />)
    expect(wrapper.find('h2').text()).toBe('¿Cuánto debo comprar para el asado?')
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<Asado />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })
})
