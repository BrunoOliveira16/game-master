import React from 'react';

// A função compara dois itens e determinar sua ordem com base em suas avaliações
const compare = (a, b, by, ratings, sortOrder) => {
  const ratingA = ratings[a.props.item.id];
  const ratingB = ratings[b.props.item.id];

  // lógica de comparação
  if (ratingA < ratingB) {
    return sortOrder === 'desc' ? 1 : -1;
  } else if (ratingA > ratingB) {
    return sortOrder === 'desc' ? -1 : 1;
  } else {
    return 0;
  }
}

const Sort = ({ children, by, ratings, sortOrder }) => {
  if (!by) {
    // Se nenhuma propriedade 'by' for fornecida, retorne a lista original sem classificar
    return children;
  }
  // Caso contrário, converta os filhos em uma matriz usando React.Children.toArray e classifique-os usando a função compare
  return React.Children.toArray(children).sort((a, b) => compare(a, b, by, ratings, sortOrder));
}

export default Sort;
