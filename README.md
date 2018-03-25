# Calculadora de Asado en React 🥩🍴

> Simple app para conocer que y cuanto comprar en un asado y cuanto debe pagar cada comensal.

_Valores de referencia para comprar en Chile._

Basado en el clon inicial https://github.com/juanbrujo/vue-calculaasado

## Features ✔

- [x] Calcular cantidad de comensales
- [x] Calcular costo total
- [x] Calcular costo por adulto
- [x] Mostrar cantidad de carne a comprar
- [x] Listar opciones de carnes
- [ ] Sumar costo del carbon
- [ ] Mostrar costo opcional de embutidos + pan
- [ ] Incluir verduras y agregados ?
- [ ] Incluir liquidos ?

## Consideraciones 👀

- Solo se tomaron en cuenta carnes de vacuno al vacio.
- Se inluyen los siguientes cortes especiales para parrilla:
  - Abastero
  - Carnicero
  - Tapabarriga
  - Asado de tira
  - Tapapecho
  - Sobre costila
  - Huachalomo
  - Punta paleta
  - Plateada
  - Punta picana
  - Asiento
  - Punta de ganso
  - Palanca
  - Lomo liso
  - Lomo vetado
  - Filete
  - Entraña
  - Wagyu
  - Angus
  - Lomo vetado premium

- Se tomaron como referencias valores de supermercados Lider y Jumbo, promediando estos valores y segmentando en 4 grupos para generar distintos presupuestos.
- No se consideran precios en oferta, solo valores normales.
- Salvo algunos casos existe una diferencia de hasta 2000 pesos entre tipo de carne por segmento.
- Para calcular cantidad de carne se consideran los siguientes gramos que come comumente cada persona: 350 hombre, 250 mujer y 200 un niño.
- La división de valores considera solo adultos, los niños no pagan.
