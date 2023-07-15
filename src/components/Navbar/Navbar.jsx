import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
//Custom Hooks
import { useAuthentication } from 'hooks/useAuthentication';
import { useAuthContext } from 'context/useAuthContext';
import { useAppContext } from 'context/useAppContext';
//Styles
import './navbar.scss';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useAuthentication();
    const { setFavorites } = useAppContext();
    const [ showMenu, setShowMenu ] = useState(false);

    const handleLogout = async () => {
        await logout(setFavorites);
    };

    return (
        <nav className='navbar'>
            <ul className={`${showMenu ? 'navbar-list--mobile' : 'navbar-list'}`}>
                <li className='navbar-list-item'>
                    <NavLink id='home' to='/'>Inicio</NavLink>
                </li>
                {!user && (
                    <>
                        <li className='navbar-list-item'>
                            <NavLink id='login' to='/auth'>Login</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className='navbar-list-item'>
                            <NavLink id='dashboard' to='/dashboard'>Dashboard</NavLink>
                        </li>
                        <li className='navbar-list-item'>
                            <ImExit onClick={handleLogout} title='logout'/>
                        </li>
                    </>
                )}
            </ul>

           <div className='navbar-mobile'>
                {!showMenu ? 
                    <FiMenu 
                        onClick={() => setShowMenu(!showMenu)}
                    /> : 
                    <AiOutlineClose 
                        className={`${showMenu ? 'show-menu-icon--mobile' : 'show-menu-icon'}`} 
                        onClick={() => setShowMenu(!showMenu)}
                    />}      
           </div>
        </nav>
    )
};

export default Navbar;