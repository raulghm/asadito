import React, { Component } from 'react'
import './Asado.css'

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
      carbonPrice: 2800,
      budgets: [
        {
          id: 0,
          name: 'Económico',
          options: 'Abastero, Huachalomo, Sobre costilla, Carnicero, Tapabarriga, Asado de tira o Tapapecho',
          sausage: 'Chorizos o salchichas',
          meatPrice: 5660,
          sausagePrice: 3200
        },
        {
          id: 1,
          name: 'Medio',
          options: 'Plateada, Punta paleta, Punta de ganso o Punta picana',
          sausage: 'Chorizos',
          meatPrice: 7340,
          sausagePrice: 4000
        },
        {
          id: 2,
          name: 'Alto',
          options: 'Lomo liso, Filete, Asiento, Palanca, Entraña o Lomo vetado',
          sausage: 'Longanizas',
          meatPrice: 10870,
          sausagePrice: 5800
        },
        {
          id: 3,
          name: 'Premium',
          options: 'Wagyu, Angus o Lomo vetado premium.',
          sausage: 'Longanizas',
          meatPrice: 20000,
          sausagePrice: 7000
        }
      ],
      budgetIndex: 0,
      budgetSelected: null,
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
  
  handleBudget = event => {
    const value = parseInt(event.target.value, 10)
    const budget = this.state.budgets.find(item => item.id === value)

    this.setState({ 
      budgetIndex: event.target.value,
      budgetSelected: budget
    })
  }

  peopleCount = () => {
    return this.state.user.men + 
          this.state.user.women + 
          this.state.user.children
  }

  meatCount = () => {
    return this.round(
      (this.state.user.men * 0.35) + 
      (this.state.user.women * 0.25) + 
      (this.state.user.children * 0.2)
    )
  }

  sausageCount = () => {
    return (this.state.user.men * 0.1) +
      (this.state.user.women * 0.05) + 
      (this.state.user.children * 0.05)
  }

  round = (number, precision = 1) => {
    const factor = Math.pow(10, precision)
    const result = Math.round(number * factor) / factor
    return number ? result : 0
  }

  totalPrice = () => {
    const meat = this.meatCount() * this.state.budgetSelected.meatPrice
    // const sausage = this.sausageCount() * this.state.budgetSelected.sausagePrice
    return this.round(meat)
  }

  eachPrice = () => {
    return this.round(
      this.totalPrice() / 
      (this.state.user.men + this.state.user.women)
    , -1)
  }

  formatPrice = (number) => {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
  }

  render() {
    const {
      title,
      budgets,
      budgetSelected,
      peopleCount = this.peopleCount()
    } = this.state

    return (
      <div className="Asado">
        <div className="Asado-body">
          <h1>Calculadora de Asado</h1>

          <h2>{title}</h2>
          <div className="Asado-select">
            <h3>1- Indica la cantidad de comensales</h3>
            <div className="Asado-select-body Asado-select-body--column">
              <div className="Asado-select-item">
                <h4>Hombres</h4>
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
                <h4>Mujeres</h4>
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
                <h4>Niños</h4>
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
              </div>
            </div>
          }

          { budgetSelected &&
            <div className="Asado-select">
              <h3>Resultados</h3>
              <div className="Asado-select-body">
                Opciones de carnes para comprar:
                <p>{budgetSelected.options}</p>
                { this.meatCount() + 'kg de carne' }
                <br/>
                Costo total: ${ this.formatPrice(this.totalPrice()) }
                <br/>
                Costo cada adulto: ${ this.formatPrice(this.eachPrice()) }
              </div>
            </div>
          }        
        </div>
      </div>
    )
  }
}

export default Asado
