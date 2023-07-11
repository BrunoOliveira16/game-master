import { useEffect, useState } from "react";
// Custom Hooks
import useFetchData from "hooks/useFetchData";
// Context
import { useAppContext } from 'context/useAppContext';
// Components
import Card from 'components/Card/Card';
import Sidebar from 'components/Sidebar/Sidebar';
import CardError from "components/CardError/CardError";
import Loader from "components/Loader/Loader";
import FavoritesButton from "components/FavoritesButton/FavoritesButton";
// Styles
import './mainContent.scss';

const MainContent = () => {
    const { data, loading, error } = useFetchData();
    const { search, selectedGenre, setGenres, favorites } = useAppContext();
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        if(data) {
            setGenres([...new Set(data?.map((item) => item.genre))]);
        }  
    }, [data, setGenres]);

    const filteredData = data && data.filter((item) => (
        (!showFavorites || favorites.some((favorite) => favorite.id === item.id)) &&
        (!selectedGenre || item.genre === selectedGenre) && 
        (!search || item.title.toLowerCase().includes(search.toLowerCase()))
    ));

    return (
        <main className='main container'>
            <div className="main-content">
                <h3 className='text-title'>Lista de jogos</h3>
                {loading && <Loader />}
                {error && <CardError error={error} />}
                <div className="main-content-cards">
                {!loading && 
                    !error &&
                    filteredData && 
                    filteredData.map((item) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        thumbnailUrl={item.thumbnail} 
                        item = {item}  
                        developer = {item.developer}                       
                    />
                    ))
                }
                </div>
            </div>
            <div className='main-sidebar'>
                <FavoritesButton setShowFavorites={setShowFavorites}/>
                <Sidebar />
            </div>
        </main>
    );
};
export default MainContent;