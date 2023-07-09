// Context
import { useAppContext } from 'context/useAppContext';

// Component
import List from 'components/List/List';

const Sidebar = () => {
    const { genres, setSelectedGenre } = useAppContext();

    return (
        <aside className="sidebar">
            <h3 className='text-title'>Navegar por gênero</h3>
            <List genres={genres} onGenreClick={setSelectedGenre} />
        </aside>
    );
};

export default Sidebar;