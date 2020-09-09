export const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value); // TODO


//  let options = {
//   year: 'numeric', month: 'numeric', day: 'numeric',
//   hour: 'numeric', minute: 'numeric', second: 'numeric',
//   hour12: false,
//   timeZone: 'America/Los_Angeles' 
// };

// export  const formatDate = (value: Date): string =>
// Intl.DateTimeFormat('pt-BR',options).format(value);

export default formatValue