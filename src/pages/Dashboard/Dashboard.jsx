import { useAuthentication } from 'hooks/useAuthentication';
import { useAppContext } from 'context/useAppContext';
import Card from 'components/Card/Card';
import './dashboard.scss';

const Dashboard = () => {
  const { auth } = useAuthentication();
  const user = auth.currentUser;
  const { favorites, ratings } = useAppContext();


  return (
    <div className="dash container">
      <h2 className='dash-title text-center'>Olá, <span >{user.displayName}</span></h2>
      <h3 className='text-title'>Seus jogos favoritos:</h3>
      <p className='dash-info'>Você possui <span>{favorites.length}</span> jogos como favoritos e <span>{Object.keys(ratings).length}</span> jogos avaliados</p>
      <div className='dash-cards'>
        {favorites.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            thumbnailUrl={item.thumbnail}
            item={item}
            developer={item.developer}
          />
        ))}
      </div>
    </div>
  )  
}

export default Dashboard;