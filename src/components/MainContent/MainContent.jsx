import { useState, useEffect } from "react";

// Data
import { fetchData } from "data/data";

// Styles
import './mainContent.scss';

// Components
import Card from 'components/Card/Card';
import Sidebar from 'components/Sidebar/Sidebar';
import CardError from "components/CardError/CardError";
import Loader from "components/Loader/Loader";

const MainContent = ({ search, selectedGenre, onGenreClick, onDataChange, genres }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchData().then(data => {
            setData(data);
            setLoading(false);
            onDataChange(data);
        }).catch(error => {
            setError(error.message);
            setLoading(false)
        })
    }, []);

    return (
        <main className='main container'>
            <div className="main-content">
                <h3 className='text-title'>Lista de jogos</h3>
                {loading && <Loader />}
                {error && <CardError error={error} />}
                <div className="main-content-cards">
                    {!loading && !error && (
                        <>
                            {data && data.filter(item => (
                                    (!selectedGenre || item.genre === selectedGenre) && 
                                    (!search || item.title.toLowerCase().includes(search.toLowerCase()))
                                )).map(item => (
                                    <Card
                                        key={item.id}
                                        title={item.title}
                                        thumbnailUrl={item.thumbnail}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className='main-sidebar'>
                <Sidebar onGenreClick={onGenreClick} genres={genres}/>
            </div>
        </main>
    );
};
export default MainContent;