import Vue from 'vue'
import { SIMNAO_ENUM } from '@/enums'

Vue.filter('filterSimNao', value => {
  return SIMNAO_ENUM.values.filter(r => r.value === value).map(r => r.text)[0]
}

)
