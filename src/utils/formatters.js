export const formatNumber = (value) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(value)

export default { formatNumber }

