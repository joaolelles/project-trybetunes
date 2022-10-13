import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      infoFavorites: [],
      favoritesChecked: false,
    };
  }

  favoritesAlbum = async (event) => {
    const { musics } = this.props;
    const { infoFavorites } = this.state;
    const clickEvent = event.target.checked;

    this.setState({
      loading: true,
      favoritesChecked: clickEvent,
    });

    const favoriteSongsAPI = await addSong(musics);
    this.setState(({
      loading: false,
      infoFavorites: [...infoFavorites, favoriteSongsAPI],
    }), getFavoriteSongs);
  };

  render() {
    const { loading, favoritesChecked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        { loading ? <Loading /> : (
          <form>
            <label
              htmlFor={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            >
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                checked={ favoritesChecked }
                onChange={ this.favoritesAlbum }
              />
            </label>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </form>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

// Requisito resolvido com a ajuda da Aimê S2 e o Sergio.

export default MusicCard;
