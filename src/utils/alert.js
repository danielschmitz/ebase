import { getErrorMessage } from './error'

/**
 * Exibe uma notificação no canto inferior da tela,
 * desaparece em um intervalo de tempo
 *
 * @param {string} mensgem A mensagem que aparece na notificação
 */
export const showFlash = msg => {
  alert.toast(msg)
}

/**
 * Exibe uma mensagem em uma caixa de diálogo modal
 *
 * @param {string} mensagem A mensagem a ser exibida
 */
export const showDialog = msg => {
  alert.ok(msg)
}

/**
 * Exibe uma mensagem pedindo a confirmação de algo ao usuário
 *
 * @param {string} mensagem A mensagem exibida para o usuário
 * @param {function} callback Uma função de callback que é executada após o usuário selecionar a opção
 */
export const showConfirm = (msg, callback) => {
  alert.confirm(msg, callback)
}

/**
 * Exibe uma notificação de erro no canto inferior da tela,
 * desaparece em um intervalo de tempo
 *
 * @param {string} mensgem A mensagem que aparece na notificação
 */
export const showFlashError = msg => {
  alert.toastError(msg)
}

/**
 * Exibe uma mensagem de erro
 * @param {*} error
 */
export const showError = error => {
  const messages = getErrorMessage(error)
  alert.error(messages[0], messages[1])
}

/**
 * Configurações internas do alert.
 * Não altere os valores desta propriedade
 */
export const alert = {
  config: {
    snackbar: {
      color: 'primary',
      timeout: 3000,
      text: '',
      show: false
    },
    dialog: {
      show: false,
      color: 'primary',
      text: '',
      text2: '',
      title: '',
      icon: ''
    },
    confirm: {
      show: false,
      text: '',
      callback: null,
      /**
       * Teste de comentario
       * @param callbackResult
       */
      choice: function (callbackResult) {
        alert.config.confirm.show = false
        alert.config.confirm.callback(callbackResult)
      }
    }
  },
  toast: function (msg) {
    this.config.snackbar.color = 'primary'
    this.config.snackbar.text = msg
    this.config.snackbar.timeout = 3000
    this.config.snackbar.show = true
  },
  toastError: function (msg) {
    this.config.snackbar.color = 'error'
    this.config.snackbar.text = msg
    this.config.snackbar.timeout = 4000
    this.config.snackbar.show = true
  },
  ok: function (msg) {
    this.config.dialog.title = ''
    this.config.dialog.icon = 'done_outline'
    this.config.dialog.color = 'primary'
    this.config.dialog.text = msg
    this.config.dialog.text2 = ''
    this.config.dialog.show = true
  },
  error: function (message1, message2) {
    this.config.dialog.title = 'Erro'
    this.config.dialog.icon = 'error_outline'
    this.config.dialog.text = message1
    this.config.dialog.text2 = message2
    this.config.dialog.color = 'error'
    this.config.dialog.show = true
  },
  confirm: function (msg, callback) {
    this.config.confirm.text = msg
    this.config.confirm.callback = callback
    this.config.confirm.show = true
  }
}
