import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Componets/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searching: '',
      disableSearch: false,
      loading: '',
      list: '',
      result: '',
      apiReturn: false,
    };
  }

  handleClick = async () => {
    const { searching } = this.state;
    const api = await searchAlbumsAPIs(searching);
    this.setState({
      searching: '',
      loading: false,
      list: api,
      result: `Resultado de álbuns de: ${searching}`,
      apiReturn: true,
    });
  };

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

  getList = () => {
    const { list, result } = this.state;
    if (list.length === 0) {
      return 'Nenhum álbum foi encontrado';
    }
    return (
      <>
        <p>{result}</p>
        {list.map((artist, index) => (
          <ul key={ index }>
            <li>{artist.artistId}</li>
            <li>{artist.artistName}</li>
            <li>{artist.collectionId}</li>
            <li>{artist.collectionName}</li>
            <li>{artist.collectionPrice}</li>
            <li>{artist.artworkUrl100}</li>
            <li>{artist.releaseDate}</li>
            <li>{artist.trackCount}</li>
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
            >
              Acesse o Álbum desse artista
            </Link>
          </ul>
        ))}
      </>
    );
  };

  render() {
    const { disableSearch, searching, loading, apiReturn } = this.state;
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Loading /> }
        {apiReturn && this.getList()}
      </div>
    );
  }
}

export default Search;
