export default {
  _email: '',
  set email (str) {
    this._email = str
    localStorage.setItem('email', str)
  },
  get email () {
    return this._email || localStorage.getItem('email')
  },
  _uid: '',
  set uid (str) {
    this._uid = str
    localStorage.setItem('uid', str)
  },
  get uid () {
    return this._uid || localStorage.getItem('uid')
  },
  _token: '',
  set token (str) {
    this._token = str
    localStorage.setItem('token', str)
  },
  get token () {
    return this._token || localStorage.getItem('token')
  },
  _refresh: '',
  set refresh (str) {
    this._refresh = str
    localStorage.setItem('refresh', str)
  },
  get refresh () {
    return this._refresh || localStorage.getItem('refresh')
  },
  _nome: '',
  set nome (str) {
    this._nome = str
    localStorage.setItem('nome', str)
  },
  get nome () {
    return this._nome || localStorage.getItem('nome')
  },
  _ativo: '',
  set ativo (str) {
    this._ativo = str
    localStorage.setItem('ativo', str)
  },
  get ativo () {
    return this._ativo || localStorage.getItem('ativo')
  }
}
