import { useState } from 'react';

// Styles
import './list.scss';

// Context
import { useAppContext } from 'context/useAppContext';

const List = () => {
    const [active, setActive] = useState('all');
    const { genres, setSelectedGenre } = useAppContext();

    return (
        <nav>
            <ul className='list'>
                <li 
                    onClick={() => {
                        setSelectedGenre(null)
                        setActive('all')
                    }} 
                    className={active === 'all' ? 'list-item active-work' : 'list-item'}
                >
                    Todos
                </li>
                {genres.map(genre => (
                    <li 
                        key={genre} 
                        onClick={() => {
                            setSelectedGenre(genre)
                            setActive(genre)
                        }} 
                        className={active === genre ? 'list-item active-work' : 'list-item'}
                    >
                        {genre}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default List;