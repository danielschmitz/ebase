/**
 * Recebe uma data americana e retorna no formato BR
 * @param {String} date Uma data no formato YYYY-MM-DD
 * @returns {String} Uma data no formato DD/MM/YYYY
 */
export const formatDateToBr = date => {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

export const formatDateToEn = date => {
  if (!date) return null
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}
