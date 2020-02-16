import http from './http'

const loginService = {
  tryLogin: (username, senha) => http.post(
    '/auth', { username, senha }
  ).then(result => result.data)
}
export default loginService
