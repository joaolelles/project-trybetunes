import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Componets/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Componets/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      infoAlbum: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const api = await getMusics(id);
    this.setState({
      infoAlbum: api,
    });
  };

  render() {
    const { infoAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <div>
          {
            infoAlbum.map((music, index) => (
              index === 0 ? (

                <div key={ index }>
                  <img
                    src={ music.artworkUrl100 }
                    alt={ music.collectionName }
                  />
                  <p data-testid="artist-name">{music.artistName}</p>
                  <p data-testid="album-name">{music.collectionName}</p>
                </div>

              )
                : (
                  <div key={ music.trackId }>
                    <MusicCard
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                    />
                  </div>
                )
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
