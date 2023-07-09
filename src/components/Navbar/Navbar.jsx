import { NavLink } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <nav>
        <ul className='navbar'>
            <li className='navbar-item'>
                <NavLink id='home' to='/'>Inicio</NavLink>
            </li>
            <li className='navbar-item'>
                <NavLink id='auth' to='/auth'>Login</NavLink>
            </li>
        </ul>
    </nav>
  )
};

export default Navbar;