import { useEffect } from "react";

// Styles
import './mainContent.scss';

// Context
import { useAppContext } from 'context/AppContext';

// Custom Hooks
import useFetchData from "hooks/useFetchData";
import useFavorites from "hooks/useFavorites";

// Components
import Card from 'components/Card/Card';
import Sidebar from 'components/Sidebar/Sidebar';
import CardError from "components/CardError/CardError";
import Loader from "components/Loader/Loader";

const MainContent = () => {
    const { data, loading, error } = useFetchData();
    const { search, selectedGenre, setGenres } = useAppContext();
    const { favorites, handleAddFavorite, handleRemoveFavorite }  = useFavorites();

    useEffect(() => {
        if(data) {
            setGenres([...new Set(data?.map((item) => item.genre))]);
        }  
    }, [data, setGenres]);

    console.log(favorites)

    return (
        <main className='main container'>
            <div className="main-content">
                <h3 className='text-title'>Lista de jogos</h3>
                {loading && <Loader />}
                {error && <CardError error={error} />}
                <div className="main-content-cards">
                    {!loading && 
                        !error &&
                        data && 
                        data.filter((item) => (
                                (!selectedGenre || item.genre === selectedGenre) && 
                                (!search || item.title.toLowerCase().includes(search.toLowerCase()))
                            )).map((item) => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    thumbnailUrl={item.thumbnail}
                                    onAddFavorite={() => handleAddFavorite(item)}
                                    onRemoveFavorite={() => handleRemoveFavorite(item)}
                                    isFavorite={favorites.includes(item)}
                                />
                            )
                        )
                    }
                </div>
            </div>
            <div className='main-sidebar'>
                <Sidebar />
            </div>
        </main>
    );
};
export default MainContent;