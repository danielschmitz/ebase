import store from '../store'

const auth = {
  needLogin (route) {
    return route.matched.some(record => record.meta.requiresAuth) && !this.isLogged()
  },

  isLogged () {
    console.log(store.token)
    return store.token !== '' && store.token !== null
  },

  login (result) {
    store.token = result.token
  },

  logout () {
    store.token = ''
  }
}

export default auth
