import React, { Component } from 'react'
import Footer from '../../components/Footer/Footer'
import './Asado.css'
import budgets from './budgets'

class Asado extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '¿Cuánto debo comprar para el asado?',
      user: {
        men: 0,
        women: 0,
        children: 0
      },
      breadPrice: 1290,
      carbonPrice: 1156,
      budgets,
      budgetIndex: 0,
      budgetSelected: null,
      sausageSelected: false,
      carbonSelected: false
    }
  }

  handleMen = event =>
    this.setState({
      user: { ...this.state.user, men: parseInt(event.target.value, 10) }
    })

  handleWomen = event =>
    this.setState({
      user: { ...this.state.user, women: parseInt(event.target.value, 10) }
    })

  handleChildren = event =>
    this.setState({
      user: { ...this.state.user, children: parseInt(event.target.value, 10) }
    })

  handleSausage = () =>
    this.setState({
      sausageSelected: !this.state.sausageSelected
    })

  handleCarbon = () =>
    this.setState({
      carbonSelected: !this.state.carbonSelected
    })

  handleBudget = event => {
    const budgetIndex = parseInt(event.target.value, 10)
    const budget = this.state.budgets.find(item => item.id === budgetIndex)

    this.setState({
      budgetIndex,
      budgetSelected: budget
    })
  }

  handleHelp = event => {
    this.setState({ showHelp: !this.state.showHelp })
  }

  peopleCount = () => {
    const computed =
      this.state.user.men + this.state.user.women + this.state.user.children

    return computed ? computed : 0
  }

  meatCount = () => {
    return this.round(
      this.state.user.men * 0.35 +
        this.state.user.women * 0.25 +
        this.state.user.children * 0.2
    )
  }

  sausageCount = () => {
    return this.round(
      this.state.user.men * 0.1 +
        this.state.user.women * 0.05 +
        this.state.user.children * 0.05
    )
  }

  breadCount = () => {
    const breadUnit = 0.08333

    return this.round(
      this.state.user.men * breadUnit * 2 +
        this.state.user.women * breadUnit * 2 +
        this.state.user.children * breadUnit * 1
    )
  }

  carbonCount = () => {
    return this.round(
      this.meatCount() + (this.state.sausageSelected ? this.sausageCount() : 0)
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
      carbonCount = this.carbonCount()
    } = this.state

    const meat =
      meatCount *
      (budgetSelected.meats.reduce((acc, meat) => acc + meat.value, 0) /
        budgetSelected.meats.length)
    const sausage = sausageSelected
      ? sausageCount * budgetSelected.sausagePrice + breadCount * breadPrice
      : 0
    const carbon = carbonSelected ? carbonCount * carbonPrice : 0
    return this.round(meat + sausage + carbon, -1)
  }

  eachPrice = () => {
    return this.round(
      this.totalPrice() / (this.state.user.men + this.state.user.women),
      -1
    )
  }

  render () {
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
      showHelp
    } = this.state

    return (
      <div className='Asado'>
        <div className='Asado-wrapper'>
          <div className='Asado-body'>
            <h1>
              Calculadora de Asado{' '}
              <span role='img' aria-label='meat'>
                🍖
              </span>
            </h1>
            <h2>{title}</h2>

            <div className='Asado-select Asado-select--users'>
              <h3>1- Indica la cantidad de comensales</h3>

              <div className='Asado-select-body Asado-select-body--column'>
                <div className='Asado-select-item'>
                  <h4>
                    <div>Hombres</div>
                    <span role='img' aria-label='men'>
                      👨
                    </span>
                  </h4>
                  <input
                    type='number'
                    pattern='[0-9]*'
                    min={0}
                    max={100}
                    placeholder='0'
                    onChange={this.handleMen.bind(this)}
                  />
                </div>

                <div className='Asado-select-item'>
                  <h4>
                    <div>Mujeres</div>
                    <span role='img' aria-label='women'>
                      👩
                    </span>
                  </h4>
                  <input
                    type='number'
                    pattern='[0-9]*'
                    min={0}
                    max={100}
                    placeholder='0'
                    onChange={this.handleWomen.bind(this)}
                  />
                </div>

                <div className='Asado-select-item'>
                  <h4>
                    <div>Niños</div>
                    <span role='img' aria-label='children'>
                      👶
                    </span>
                  </h4>
                  <input
                    type='number'
                    pattern='[0-9]*'
                    min={0}
                    max={100}
                    placeholder='0'
                    onChange={this.handleChildren.bind(this)}
                  />
                </div>
              </div>

              <h3>Total comensales: {peopleCount}</h3>
            </div>

            {peopleCount > 0 && (
              <div className='Asado-select Asado-select--budgets'>
                <h3>2- Selecciona tu presupuesto</h3>

                <div className='Asado-select-body Asado-select-body--column'>
                  <div className='Asado-select-item'>
                    <div className='Asado-input'>
                      <select onChange={this.handleBudget.bind(this)}>
                        <option>Selecciona...</option>
                        {budgets.map(item => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className='Asado-input Asado-input--checkbox'>
                      <label>
                        <input
                          type='checkbox'
                          value={true}
                          onChange={this.handleSausage.bind(this)}
                        />
                        Incluir embutidos + pan
                      </label>
                    </div>

                    <div className='Asado-input Asado-input--checkbox'>
                      <label>
                        <input
                          type='checkbox'
                          value={true}
                          onChange={this.handleCarbon.bind(this)}
                        />
                        Incluir carbón
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {peopleCount > 0 && budgetSelected && (
              <div className='Asado-select Asado-select--results'>
                <h3>3- Resultados</h3>

                <div className='Asado-select-body'>
                  Opciones de carnes para comprar:
                  <p>
                    {budgetSelected.meats.map((option, i) => {
                      return i === budgetSelected.meats.length - 1
                        ? `${option.name}.`
                        : `${option.name}, `
                    })}
                  </p>
                  <h4>
                    <ul>
                      <li>
                        {meatCount + 'kg de carne'}
                        <span role='img' aria-label='meat'>
                          🍖
                        </span>
                      </li>

                      {sausageSelected && (
                        <li>{sausageCount + 'kg de embutidos'}</li>
                      )}

                      {sausageSelected && <li>{breadCount + 'kg de pan'}</li>}

                      {carbonSelected && (
                        <li>{carbonCount + 'kg de carbón'}</li>
                      )}
                    </ul>
                  </h4>
                  <h4>
                    Costo total: ${this.totalPrice().toLocaleString('es-ES')}
                    <span role='img' aria-label='meat'>
                      👈
                    </span>
                  </h4>
                  <h4>
                    Costo cada adulto: $
                    {this.eachPrice().toLocaleString('es-ES')}
                    <span role='img' aria-label='meat'>
                      ☝
                    </span>
                  </h4>
                </div>
              </div>
            )}

            <div className='Asado-help' onClick={this.handleHelp.bind(this)}>
              <h4>
                ¿Cómo funciona?{' '}
                <span role='img' aria-label='eyes'>
                  👀
                </span>
              </h4>
              {showHelp && (
                <>
                  <ul>
                    <li>
                      Se tomaron como referencias valores de supermercados Lider
                      y Jumbo, promediando estos valores y segmentando en 4
                      grupos para generar distintos presupuestos.
                    </li>
                    <li>
                      Solo se tomaron en cuenta carnes de vacuno al vacío.
                    </li>
                    <li>
                      No se consideran precios en oferta, solo valores normales.
                    </li>
                    <li>
                      Salvo algunos casos existe una diferencia de hasta 2000
                      pesos entre tipo de carne por segmento.
                    </li>
                    <li>
                      Para calcular cantidad de carne se consideran los
                      siguientes gramos que come comúnmente cada persona: 350
                      hombre, 250 mujer y 200 un niño.
                    </li>
                    <li>
                      La división de valores considera solo adultos, los niños
                      no pagan.
                    </li>
                  </ul>

                  <div>
                    <p>~</p>
                    <ul>
                      <li>
                        Código fuente disponible para mejorar o modificar a
                        gusto{' '}
                        <a href='https://github.com/raulghm/asadito'>por acá</a>
                      </li>
                      <li>
                        Imagen de fondo tomada prestada{' '}
                        <a href='https://unsplash.com/photos/jeiqzOgwwKU'>
                          desde Unplash
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Asado
