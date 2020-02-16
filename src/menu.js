export default [
  {
    icon: 'home',
    title: 'Home',
    to: '/',
    auth: false
  },
  {
    icon: 'lock',
    title: 'Login',
    to: '/login',
    auth: false
  },
  {
    icon: 'local_grocery_store',
    title: 'Northwind',
    auth: false,
    children: [
      {
        title: 'Categories',
        to: '/northwind-categories',
        auth: false
      }
    ]
  },
  {
    icon: 'lock_open',
    title: 'Logout',
    to: '/logout',
    auth: true
  }]
