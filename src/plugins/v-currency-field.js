import Vue from 'vue'
import currency from 'v-currency-field'

import 'v-currency-field/dist/index.css'

Vue.use(currency, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: '',
  precision: 2,
  masked: false
})
