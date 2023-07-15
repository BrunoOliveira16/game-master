import { useState } from 'react';

// Styles
import './list.scss';

// Context
import { useAppContext } from 'context/useAppContext';

const List = () => {
    const [active, setActive] = useState('all');
    const { genres, setSelectedGenre } = useAppContext();

    return (
        <nav className='genres'>
            <ul className='genres-list'>
                <li 
                    onClick={() => {
                        setSelectedGenre(null)
                        setActive('all')
                    }} 
                    className={active === 'all' ? 'genres-list-item active-work' : 'genres-list-item'}
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
                        className={active === genre ? 'genres-list-item active-work' : 'genres-list-item'}
                    >
                        {genre}
                    </li>
                ))}
            </ul>
            <select 
                name="select" 
                className='genres-select'
                onChange={(e) => {
                    setSelectedGenre(e.target.value === 'all' ? null : e.target.value )
                }}
            >
                <option value="all">TODOS</option>
                {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>
        </nav>
    )
}

export default List;