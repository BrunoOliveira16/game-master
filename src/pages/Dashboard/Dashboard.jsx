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

  const filteredFavorites = favorites.filter((item) => (
    !ratingFilter || ratings[item.id] === ratingFilter
  ))

  return (
    <div className="dash container">
      <h2 className='dash-title text-center'>Olá, <span >{user.displayName}</span></h2>
      <h3 className='text-title'>Seus jogos favoritos:</h3>
      <p className='dash-info'>Você possui <span>{favorites.length}</span> jogos como favoritos e <span>{Object.keys(ratings).length}</span> jogos avaliados</p>
      <RatingFilter className='dash-filter' setRatingFilter={setRatingFilter} setSortOrder={setSortOrder} />
      <div className='dash-cards'>
        <Sort by='rating' ratings={ratings} sortOrder={sortOrder}>
          {filteredFavorites.map((item) => (
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
    </div>
  )  
}

export default Dashboard;