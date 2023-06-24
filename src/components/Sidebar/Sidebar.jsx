import React from 'react';

// Component
import List from 'components/List/List';

const Sidebar = ({ onGenreClick, genres }) => {
    return (
        <aside className="sidebar">
            <h3 className='text-title'>Navegar por gênero</h3>
            <List genres={genres} onGenreClick={onGenreClick}/>
        </aside>
    );
};

export default Sidebar;