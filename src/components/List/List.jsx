import React, { useState } from 'react';

// Styles
import './list.scss';

const List = ({ genres, onGenreClick }) => {
    const [active, setActive] = useState('all');

    return (
        <nav>
            <ul className='list'>
                <li 
                    onClick={() => {
                        onGenreClick(null)
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
                            onGenreClick(genre);
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