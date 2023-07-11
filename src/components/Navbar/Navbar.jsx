import { NavLink } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
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

    const handleLogout = async () => {
        await logout(setFavorites);
      };

    return (
        <nav>
            <ul className='navbar'>
                <li className='navbar-item'>
                    <NavLink id='home' to='/'>Inicio</NavLink>
                </li>
                {!user && (
                    <>
                        <li className='navbar-item'>
                            <NavLink id='login' to='/auth/login'>Login</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className='navbar-item'>
                            <NavLink id='dashboard' to='/dashboard'>Dashboard</NavLink>
                        </li>
                        <li className='navbar-item'>
                            <ImExit onClick={handleLogout} title='logout'/>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
};

export default Navbar;