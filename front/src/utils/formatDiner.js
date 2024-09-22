export function formatearDinero(digito) {
  const formateado = digito.toLocaleString("es-ES");
  return `$${formateado}`;
}
