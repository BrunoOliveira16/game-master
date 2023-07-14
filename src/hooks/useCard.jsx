import { useContext, useEffect, useState } from 'react';
import { useAppContext } from 'context/useAppContext';
import { AuthContext } from 'context/AuthContext';
import useFavorites from 'hooks/useFavorites';
import useRating from 'hooks/useRating';

const useCard = (item) => {
  const { user } = useContext(AuthContext);
  const { favorites, setFavorites, ratings } = useAppContext();

  const isFavorited = favorites.some((favorite) => favorite.id === item.id);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const ratingValue = ratings.find((rating) => rating.id === item.id)?.rating || 0;
  const [ isRating, setIsRating] = useState(ratingValue);
  
  const [showModal, setShowModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  const { handleAddFavorite, handleRemoveFavorite } = useFavorites(setFavorites);
  const { handleAddRatings, handleRemoveRatings } = useRating(item);

  // Limpa marcação de favoritos e avaliações quando o usuário não está logado
  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      setIsRating(0);
    }
  }, [user]);

  // Função para lidar com cliques em itens favoritos
  const handleFavoritClick = () => {
    if (!user) {
      setShowModal(true);
      setTextMessage('adicionar como favorito');
      return;
    }
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      handleRemoveFavorite(item);
    } else {
      handleAddFavorite(item);
    }
  };

  // Função para lidar com cliques em itens avaliados
  const handleRatingClick = (newRating) => {
    if (!user) {
      setShowModal(true);
      setTextMessage('avaliar o jogo');
      return;
    }
    if (isRating === newRating) {
      handleRemoveRatings(item);
      setIsRating(0);
    } else {
      handleAddRatings({ ...item, rating: newRating });
      setIsRating(newRating);
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
  };
};

export default useCard;
