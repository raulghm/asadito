import React, { Component } from 'react'
import './Footer.css'

class Footer extends Component {
  render () {
    return (
      <div className='Footer'>
        <a href='https://github.com/raulghm/asadito'>
          Otro aplicativo más por <b>raulghm</b>{' '}
          <span role='img' aria-label='ok_hand'>
            👌
          </span>
        </a>
      </div>
    )
  }
}

export default Footer
