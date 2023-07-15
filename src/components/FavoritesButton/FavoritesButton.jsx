import { useEffect, useState } from 'react';
import { useAuthentication } from 'hooks/useAuthentication';
import './favoritesButton.scss';

const FavoritesButton = ({ setShowFavorites }) => {
    const [active, setActive] = useState(false);
    const { auth } = useAuthentication();
    const user = auth.currentUser;

    //Limpa filtro quando deslogar
    useEffect(() => {
        if(!user) {
            setActive(false);
            setShowFavorites(false);
        }
    }, [setShowFavorites, user]);

    //Função para adicionar o filtro
    const handleFavoritesClick = () => {
        setShowFavorites(!active);
        setActive(!active);
    };

    // Não exibe favoritos quando deslogado
    if (!user) {
        return null;
    }

    return (
        <nav className='favorites'>
            <ul className='favorites-list'>
                <li 
                    onClick={handleFavoritesClick} 
                    className={active === true ? ' active-work favorites-list-item' : 'favorites-list-item'}
                >
                    Meus favoritos
                </li>
            </ul>
        </nav>
    );
};

export default FavoritesButton;
