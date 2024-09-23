module.exports = (objetoParams) => {
  for (let propriedade in objetoParams) {
    /*Busca se existe as palavras Id ou id na propriedade*/
    if (/Id|id/.test(propriedade)) {
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  return objetoParams;
};
