import React from 'react';

//Styles and Assets
import './cardError.scss';
import Error from 'assets/error.jpg';

const CardError = ({ error }) => {
  return (
    <div className='card-error text-center'>
        <img src={Error} alt="Imagem de erro"/>
        <p>{error}</p>
    </div>
  );
};

export default CardError;