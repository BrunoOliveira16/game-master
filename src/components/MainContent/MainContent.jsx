import { useEffect, useState } from "react";
// Custom Hooks
import useFetchData from "hooks/useFetchData";
import { useAuthentication } from 'hooks/useAuthentication';
// Context
import { useAppContext } from 'context/useAppContext';
// Components
import Card from 'components/Card/Card';
import Sidebar from 'components/Sidebar/Sidebar';
import CardError from "components/CardError/CardError";
import Loader from "components/Loader/Loader";
import FavoritesButton from "components/FavoritesButton/FavoritesButton";
import RatingFilter from 'components/RatingFilter/RatingFilter'
import Sort from 'components/Sort/Sort';
// Styles
import './mainContent.scss';

const MainContent = () => {
    const { data, loading, error } = useFetchData();
    const { auth } = useAuthentication();
    const user = auth.currentUser;
    const { search, selectedGenre, setGenres, favorites, ratings } = useAppContext();
    const [showFavorites, setShowFavorites] = useState(false);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        if(data) {
            setGenres([...new Set(data?.map((item) => item.genre))]);
        }  
    }, [data, setGenres]);

    const filteredData = data && data.filter((item) => (
        (!showFavorites || favorites.some((favorite) => favorite.id === item.id)) &&
        (!selectedGenre || item.genre === selectedGenre) && 
        (!search || item.title.toLowerCase().includes(search.toLowerCase())) &&
        (!ratingFilter || ratings.find(rating => rating.id === item.id)?.rating === ratingFilter)
    ));

    return (
        <main className='main container'>
            <div className="main-content">
                <h3 className='text-title'>Lista de jogos</h3>
                {loading && <Loader />}
                {error && <CardError error={error} />}
                <div className="main-content-cards">
                    {!loading && !error && filteredData && (
                        <Sort by='rating' ratings={ratings} sortOrder={sortOrder}>
                            {filteredData.map((item) => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    thumbnailUrl={item.thumbnail}
                                    item={item}
                                    developer={item.developer}
                                    profileUrl={item.freetogame_profile_url}
                                    ratings={ratings}
                                />
                            ))}
                        </Sort>
                    )}
                </div>
            </div>
            <div className='main-sidebar'>
                {user ? <h3 className='text-title'>Seção do usuário</h3> : ''}
                <div className="main-sidebar-user">
                    <FavoritesButton setShowFavorites={setShowFavorites}/>
                    <RatingFilter setRatingFilter={setRatingFilter} setSortOrder={setSortOrder} />
                </div>

                <div className="main-sidebar-nav">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
};
export default MainContent;