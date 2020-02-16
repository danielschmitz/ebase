import { g, h } from './object'

/**
 * Analisa um objeto de erro e tenta retornar
 * uma mensagem mais amigável
 * @param {*} error
 */
export const getErrorMessage = (error) => {
  let msg = ''
  let msg2 = ''

  // TODO: analisar se está em modo de producao
  console.log('ERROR', error)

  if (typeof error === 'string' || error instanceof String) {
    msg = error
  }

  if (g(error, 'response.status') === 401) {
    msg = 'Acesso negado.'
    msg2 = g(error, 'response.data.message')
    return [msg, msg2]
  }

  if (g(error, 'response.status') === 403) {
    msg = 'Sem permissão.'
    msg2 = g(error, 'response.data.message')
    return [msg, msg2]
  }

  if (error.message !== undefined) {
    msg = error.message
    msg2 = g(error, 'response.data.escription')
  }

  if (g(error, 'response.status') === 422) {
    msg = g(error, 'response.data.message')
    msg2 = ''
    if (error.response.data.errors) {
      msg2 += '<dl>'
      for (var k in error.response.data.errors) {
        msg2 += `<dt><b>${k}</b></dt> <dd>${error.response.data.errors[k]}</dd>`
      }
      msg2 += '</dl>'
    }
  }

  if (g(error, 'response.status') === 500) {
    if (h(error, 'response.data.description')) {
      msg = g(error, 'response.data.description')
    }
  }

  return [msg, msg2]
}
