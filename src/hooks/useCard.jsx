import { useContext, useEffect, useState } from 'react';
import { useAppContext } from 'context/useAppContext';
import { AuthContext } from 'context/AuthContext';
import useFavorites from 'hooks/useFavorites';
import useRating from 'hooks/useRating';

const useCard = (item) => {
  const { user } = useContext(AuthContext);
  const { favorites, setFavorites, ratings } = useAppContext();
  const [ error, setError ] = useState(null);

  const isFavorited = favorites.some((favorite) => favorite.id === item.id);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const ratingValue = ratings.find((rating) => rating.id === item.id)?.rating || 0;
  const [ isRating, setIsRating] = useState(ratingValue);
  
  const [showModal, setShowModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  const { handleAddFavorite, handleRemoveFavorite, error: favoriteError } = useFavorites(setFavorites);
  const { handleAddRatings, handleRemoveRatings, error: ratingError } = useRating(item);

  // Limpa marcação de favoritos e avaliações quando o usuário não está logado
  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      setIsRating(0);
    }
  }, [user]);

  // Função para lidar com cliques em itens favoritos
  const handleFavoritClick = async () => {
    if (!user) {
      setShowModal(true);
      setTextMessage('adicionar como favorito');
      return;
    }
    
    let success;
    if (isFavorite) {
      success = await handleRemoveFavorite(item);
    } else {
      success = await handleAddFavorite(item);
    }

    if (success) {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    }
  };
  // Verifica se há um erro de favorito e define o estado de erro
  useEffect(() => {
    if (favoriteError) {
      setError(favoriteError);
    }
  }, [favoriteError]);

  // Função para lidar com cliques em itens avaliados
  const handleRatingClick = async (newRating) => {
    if(!user) {
      setShowModal(true);
      setTextMessage('avaliar o jogo');
      return;
    }

    let success;
    if(isRating === newRating) {
      success = await handleRemoveRatings(item);
      setIsRating(0);
    } else {
      success = await handleAddRatings({ ...item, rating: newRating });
      setIsRating(newRating);
    }

    if(!success && ratingError) {
      setError(ratingError);
    }
  };

  return {
    isFavorite,
    isRating,
    showModal,
    setShowModal,
    textMessage,
    setTextMessage,
    handleFavoritClick,
    handleRatingClick,
    error,
  };
};

export default useCard;
