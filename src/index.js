import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Asado from './components/Asado/Asado'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Asado />, document.getElementById('root'))
registerServiceWorker()
