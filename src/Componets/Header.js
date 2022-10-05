import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
        <header data-testid="header-component" />
        <Link data-testid="link-to-search" to="/search">Procurar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </div>
    );
  }
}

export default Header;
