import React from 'react';
import Header from '../Componets/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Favoritos
      </div>
    );
  }
}

export default Favorites;
