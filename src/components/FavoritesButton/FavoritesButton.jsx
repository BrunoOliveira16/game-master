import { useState } from 'react';
import { useAuthentication } from 'hooks/useAuthentication';

const FavoritesButton = ({ setShowFavorites }) => {
    const [active, setActive] = useState(false);
    const { auth } = useAuthentication();
    const user = auth.currentUser;

    const handleFavoritesClick = () => {
        setShowFavorites(!active);
        setActive(!active);
    };

    if (!user) {
        return null;
    }

    return (
        <aside className='sidebar'>
            <h3 className='text-title'>Seção do usuário</h3>
            <nav>
                <ul className='list'>
                    <li 
                        onClick={handleFavoritesClick} 
                        className={active === true ? 'list-item active-work' : 'list-item'}
                    >
                        Meus favoritos
                    </li>
                </ul>
            </nav>
            
        </aside>
        
    );
};

export default FavoritesButton;
