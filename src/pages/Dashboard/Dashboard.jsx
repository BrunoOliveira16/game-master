import { useState} from 'react';
//Custom Hooks
import { useAuthentication } from 'hooks/useAuthentication';
//Context
import { useAppContext } from 'context/useAppContext';
//Components
import Card from 'components/Card/Card';
import RatingFilter from 'components/RatingFilter/RatingFilter';
import Sort from 'components/Sort/Sort';
//Style
import './dashboard.scss';

const Dashboard = () => {
  const { auth } = useAuthentication();
  const user = auth.currentUser;
  const { favorites, ratings } = useAppContext();
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  //Cria um array com os jogos favoritos e avaliados
  const allGames = [...favorites, ...ratings];
  //Remove os jogos duplicados do array
  const uniqueGames = allGames.filter((game, index) => allGames.findIndex((itemGame) => itemGame.id === game.id) === index);
  //Filtra os jogos por avaliação
  const filteredGames = uniqueGames.filter((item) => (
    !ratingFilter || ratings.find((rating) => rating.id === item.id)?.rating === ratingFilter
  ))

  return (
    <div className="dash container">
      <h2 className='dash-title text-center'>Olá, <span >{user.displayName}</span></h2>
      <p className='dash-info'>Você possui <span>{favorites.length}</span> jogos como favoritos e <span>{ratings.length}</span> jogos avaliados</p>
      <RatingFilter className='dash-filter' setRatingFilter={setRatingFilter} setSortOrder={setSortOrder} />
      {(!favorites.length && !ratings.length) ? 
        <div className='dash-text'>
          <p className='text-center dash-cards-text'>
            Parece que você ainda não escolheu seu próximo jogo favorito, não perca tempo.
          </p>
        </div> : 
        <>
          <h3 className='text-title'>Seus jogos favoritos</h3>
          <div className='dash-cards'>
          <Sort by='rating' ratings={ratings} sortOrder={sortOrder}>
            {filteredGames.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                thumbnailUrl={item.thumbnail}
                item={item}
                developer={item.developer}
              />
            ))}
          </Sort>
        </div>
        </>
      }
    </div>
  )  
}

export default Dashboard;