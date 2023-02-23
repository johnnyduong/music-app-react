import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from "../../util/Spotify";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({SearchResults:SearchResults});
    })
  }

  addTrack(track) {
    let sPlaylistTracks = this.state.playlistTracks;

    if (sPlaylistTracks.find(t => t.id === track.id)) {
      return;
    }

    sPlaylistTracks.push(track);

    this.setState({playlistTracks: sPlaylistTracks});
  }

  removeTrack(track) {
    let sPlaylistTracks = this.state.playlistTracks;
    let sSearchResult = this.state.SearchResults;

    sPlaylistTracks = sPlaylistTracks.filter(t => t.id !== track.id);
    
    sSearchResult.unshift(track);
    
    this.setState({playlistTracks:sPlaylistTracks}); //do we need to add SearchResults:sSearchResult?
  }

  removeTrackSearch(track) {
    let sSearchResults = this.state.SearchResults;

    sSearchResults.filter(t => t.id !== track.id);

    this.setState({SearchResults: sSearchResults});
  }

  doThese(track) {
    this.addTrack(track); 
    this.removeTrackSearch(track);
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const sPlaylistTrackUris = this.state.playlistTracks.map(t => t.uri);

    Spotify.savePlaylist(this.state.playlistName, sPlaylistTrackUris).then(() => {
      this.setState({
        updatePlaylistName: "New Playlist",
        playlistTracks: []
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          <a href="http://localhost:3000">Musicophile</a>
        </h1>
        <div>
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.doThese}/>
            <Playlist playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
