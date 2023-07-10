import { NavLink } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import './navbar.scss';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAuthContext } from 'context/useAuthContext';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useAuthentication();

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
                        <li className='navbar-item'>
                            <NavLink id='register' to='/auth/register'>Cadastro</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className='navbar-item'>
                            <NavLink id='dashboard' to='/dashboard'>Dashboard</NavLink>
                        </li>
                        <li className='navbar-item'>
                            <ImExit onClick={logout} title='logout'/>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
};

export default Navbar;