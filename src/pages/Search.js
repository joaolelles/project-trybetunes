import React from 'react';
import Header from '../Componets/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searching: '',
      disableSearch: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      () => ({ [name]: value }),
      this.validationSearch(),
    );
  };

  validationSearch = () => {
    const { searching } = this.state;
    const minLength = 1;
    if (searching.length >= minLength) {
      this.setState({ disableSearch: false });
    } else {
      this.setState({ disableSearch: true });
    }
  };

  render() {
    const { disableSearch, searching } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Buscar</p>
        <form>
          <input
            type="text"
            name="searching"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ searching }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disableSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
