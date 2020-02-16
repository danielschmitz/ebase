/**
 * HttpUtils é uma classe com utilitários para manipulação de dados
 * que de alguma forma se relacionam com o acesso http ao servidor
 */
export default {
  /**
   * Método que calcula uma Query String para ser usada
   * pelo backend de forma que a paginação seja feita corretamente.
   * Toda paginação precisa de dois parâmetros que é o registro
   * inicial e  o registro final a ser obtido.
   * Eesta implementação varia de acordo com o que o backend espera.
   *
   * @param {number} page A página que se deve acessar
   * @param {number} rowsPerPage Quantos registros devem ser exibidos na pagina
   * @param {number} search Um termo de busca que pode ser aplicado
   * @returns {string} Uma string no formato queryString com os parâmetros _start, _end e _q
   */
  getQueryStringPagination: (page, rowsPerPage, search) => {
    let start = (page - 1) * rowsPerPage
    let end = page * rowsPerPage
    return `_start=${start}&_end=${end}&q=${search}`
  }
}
