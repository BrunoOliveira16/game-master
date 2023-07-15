// Styles and Assets
import './header.scss';
import Logo from 'assets/logo.png';

// Context
import { useAppContext } from 'context/useAppContext';

// Components
import Search from 'components/Search/Search';
import Navbar from 'components/Navbar/Navbar';

const Header = () => {
  const { setSearch } = useAppContext();

  return (
    <header>
        <div className="container text-center-sm">
          <div className='wrapper-menu'>
            <div className="header-brand">
              <img src={Logo} alt="imagem de um jostick de video game"/>
              <h1>Games<span>Master</span></h1>
            </div>
            <Navbar />
          </div>
          <Search onSearch={setSearch} />
        </div>
    </header>
  );
};

export default Header;