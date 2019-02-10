import React, { Component } from 'react'
import Footer from '../../components/Footer/Footer'
import './Asado.css'
import budgets from './budgets'

class Asado extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '¿Cuánto debo comprar para el asado?',
      user: {
        men: 0,
        women: 0,
        children: 0,
      },
      breadPrice: 1200,
      carbonPrice: 1156,
      budgets,
      budgetIndex: 0,
      budgetSelected: null,
      sausageSelected: false,
      carbonSelected: false,
    }
  }

  handleMen = event => this.setState({
    user: {...this.state.user, men: parseInt(event.target.value, 10) }
  })

  handleWomen = event => this.setState({
    user: {...this.state.user, women: parseInt(event.target.value, 10) }
  })

  handleChildren = event => this.setState({
    user: {...this.state.user, children: parseInt(event.target.value, 10) }
  })

  handleSausage = () => this.setState({
    sausageSelected: !this.state.sausageSelected
  })

  handleCarbon = () => this.setState({
    carbonSelected: !this.state.carbonSelected
  })

  handleBudget = event => {
    const value = parseInt(event.target.value, 10)
    const budget = this.state.budgets.find(item => item.id === value)

    this.setState({
      budgetIndex: event.target.value,
      budgetSelected: budget
    })
  }

  peopleCount = () => {
    const computed = this.state.user.men +
      this.state.user.women +
      this.state.user.children

    return computed ? computed : 0
  }

  meatCount = () => {
    return this.round(
      (this.state.user.men * 0.35) +
      (this.state.user.women * 0.25) +
      (this.state.user.children * 0.2)
    )
  }

  sausageCount = () => {
    return this.round(
      (this.state.user.men * 0.1) +
      (this.state.user.women * 0.05) +
      (this.state.user.children * 0.05)
    )
  }

  breadCount = () => {
    const breadUnit = 0.08333

    return this.round(
      (this.state.user.men * breadUnit * 2) +
      (this.state.user.women * breadUnit * 2) +
      (this.state.user.children * breadUnit * 1)
    )
  }

  carbonCount = () => {
    return this.round(
      this.meatCount() +
      (this.state.sausageSelected ? this.sausageCount() : 0)
    )
  }

  round = (number, precision = 1) => {
    const factor = Math.pow(10, precision)
    const result = Math.round(number * factor) / factor
    return number ? result : 0
  }

  totalPrice = () => {
    const {
      budgetSelected,
      meatCount = this.meatCount(),
      sausageCount = this.sausageCount(),
      sausageSelected,
      carbonSelected,
      carbonPrice,
      breadCount = this.breadCount(),
      breadPrice,
      carbonCount = this.carbonCount(),
    } = this.state

    const meat = meatCount * budgetSelected.meatPrice

    const sausage = sausageSelected ?
                  (sausageCount * budgetSelected.sausagePrice) +
                  (breadCount * breadPrice) : 0

    const carbon = carbonSelected ?
                  carbonCount * carbonPrice : 0

    return this.round(
      meat +
      sausage +
      carbon
    , -1)
  }

  eachPrice = () => {
    return this.round(
      this.totalPrice() /
      (this.state.user.men + this.state.user.women)
    , -1)
  }

  render() {
    const {
      title,
      budgets,
      budgetSelected,
      peopleCount = this.peopleCount(),
      meatCount = this.meatCount(),
      sausageCount = this.sausageCount(),
      breadCount = this.breadCount(),
      carbonCount = this.carbonCount(),
      sausageSelected,
      carbonSelected,
    } = this.state

    return (
      <div className="Asado">
        <div className="Asado-wrapper">
          <div className="Asado-body">
            <h1>Calculadora de Asado <span role="img" aria-label="meat">🍖</span></h1>

            <h2>{title}</h2>

            <div className="Asado-select">
              <h3>1- Indica la cantidad de comensales</h3>

              <div className="Asado-select-body Asado-select-body--column">
                <div className="Asado-select-item">
                  <h4>Hombres <span role="img" aria-label="men">👨</span></h4>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    min={0}
                    max={100}
                    placeholder="0"
                    onChange={this.handleMen.bind(this)}
                  />
                </div>

                <div className="Asado-select-item">
                  <h4>Mujeres <span role="img" aria-label="women">👩</span></h4>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    min={0}
                    max={100}
                    placeholder="0"
                    onChange={this.handleWomen.bind(this)}
                  />
                </div>

                <div className="Asado-select-item">
                  <h4>Niños <span role="img" aria-label="children">👶</span></h4>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    min={0}
                    max={100}
                    placeholder="0"
                    onChange={this.handleChildren.bind(this)}
                  />
                </div>
              </div>

              <h3>Total comensales: {peopleCount}</h3>
            </div>

            { peopleCount > 0 &&
              <div className="Asado-select">
                <h3>2- Selecciona tu presupuesto</h3>

                <div className="Asado-select-body Asado-select-body--column">
                  <div className="Asado-select-item">

                    <div className="Asado-input">
                      <select onChange={this.handleBudget.bind(this)}>
                        <option>Selecciona...</option>
                        { budgets.map(item => {
                          return <option
                            value={item.id}
                            key={item.id}
                          >{item.name}</option>
                        }) }
                      </select>
                    </div>

                    <div className="Asado-input Asado-input--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={true}
                          onChange={this.handleSausage.bind(this)}
                        />
                        Incluir embutidos + pan
                      </label>
                    </div>

                    <div className="Asado-input Asado-input--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={true}
                          onChange={this.handleCarbon.bind(this)}
                        />
                        Incluir carbón
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            }

            { peopleCount > 0 && budgetSelected &&
              <div className="Asado-select">
                <h3>3- Resultados</h3>

                <div className="Asado-select-body">
                  Opciones de carnes para comprar:

                  <p>{ budgetSelected.options.map((option, i) => {
                    if (i === budgetSelected.options.length - 1) {
                      return `${option}.`
                    } else {
                      return `${option}, `
                    }
                  }) }</p>

                  <h4>
                    <ul>
                      <li>
                        { meatCount + 'kg de carne' }
                        <span role="img" aria-label="meat">🍖</span>
                      </li>

                      { sausageSelected &&
                        <li>
                          { sausageCount + 'kg de embutidos' }
                        </li>
                      }

                      { sausageSelected &&
                        <li>
                          { breadCount + 'kg de pan' }
                        </li>
                      }

                      { carbonSelected &&
                        <li>
                          { carbonCount + 'kg de carbón' }
                        </li>
                      }
                    </ul>
                  </h4>

                  <h4>
                    Costo total: ${ this.totalPrice().toLocaleString('es-ES') }
                    <span role="img" aria-label="meat">👈</span>
                  </h4>

                  <h4>
                    Costo cada adulto: ${ this.eachPrice().toLocaleString('es-ES') }
                    <span role="img" aria-label="meat">☝</span>
                  </h4>
                </div>
              </div>
            }
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Asado
