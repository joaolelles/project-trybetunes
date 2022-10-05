import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getLogin();
  }

  getLogin = async () => {
    const { name } = await getUser();
    this.setState({ name, loading: false });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component" />
        <Link data-testid="link-to-search" to="/search">Procurar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        <h3 data-testid="header-user-name">
          Nome:
          {name}
          { loading ? <Loading /> : name }
        </h3>
      </div>
    );
  }
}

export default Header;
