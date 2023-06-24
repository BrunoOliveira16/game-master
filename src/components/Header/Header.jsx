import React from 'react';

// Styles and Assets
import './header.scss';
import Logo from 'assets/logo.png';

// Components
import Search from 'components/Search/Search';

const Header = ({ onSearch }) => {
  return (
    <header>
        <div className="container text-center-sm">
          <div className="header-brand">
            <img src={Logo} alt="imagem de um jostick de video game"/>
            <h1>Games<span>Master</span></h1>
          </div>
          <Search onSearch={onSearch} />
        </div>
    </header>
  );
};

export default Header;