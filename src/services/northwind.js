import http from './http'

const northwindService = {
  getCategories: page => http.get(`https://northwind.now.sh/api/categories?_page=${page}&_limit=5&_sort=id&_order=asc`)
}
export default northwindService
