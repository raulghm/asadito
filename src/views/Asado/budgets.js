/**
 * Valores extraidos desde la web de supermercados Jumbo y Lider
 * promediando ambos valores.
 * Solo carnes al vacio y con precios normales.
 * Se segmentan presupuestos en base a sus valores.
 */
const budgets = [
  {
    id: 0,
    name: 'Económico',
    meats: [
      {
        name: 'Abastero',
        value: 4490
      },
      {
        name: 'Carnicero',
        value: 4490
      },
      {
        name: 'Tapapecho',
        value: 4790
      },
      {
        name: 'Tapabarriga',
        value: 5740
      },
      {
        name: 'Asado de tira',
        value: 5490
      },
      {
        name: 'Sobre costilla',
        value: 5190
      },
      {
        name: 'Huachalomo',
        value: 4490
      },
      {
        name: 'Punta paleta',
        value: 4640
      }
    ],
    sausage: 'Chorizos o salchichas',
    sausagePrice: 3200
  },
  {
    id: 1,
    name: 'Medio',
    meats: [
      {
        name: 'Plateada',
        value: 5340
      },
      {
        name: 'Punta picana',
        value: 5990
      },
      {
        name: 'Asiento',
        value: 7140
      },
      {
        name: 'Lomo liso',
        value: 6490
      },
      {
        name: 'Punta de ganso',
        value: 8740
      }
    ],
    sausage: 'Chorizos',
    sausagePrice: 4000
  },
  {
    id: 2,
    name: 'Alto',
    meats: [
      {
        name: 'Lomo vetado',
        value: 9190
      },
      {
        name: 'Palanca',
        value: 10490
      },
      {
        name: 'Filete',
        value: 10240
      },
      {
        name: 'Entraña',
        value: 13490
      }
    ],
    sausage: 'Longanizas',
    sausagePrice: 5800
  },
  {
    id: 3,
    name: 'Premium',
    meats: [
      {
        name: 'Wagyu',
        value: 15990
      },
      {
        name: 'Angus',
        value: 24990
      },
      {
        name: 'Filete premium',
        value: 15990
      },
      {
        name: 'Lomo vetado premium',
        value: 14990
      },
      {
        name: 'Otros cortes premium',
        value: 14990
      }
    ],
    sausage: 'Longanizas premium',
    sausagePrice: 9000
  }
]

export default budgets
