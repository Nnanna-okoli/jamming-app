import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        searchResults: [],
        playlistName: 'My Playlist',
        playlistTracks: []
      };

        this.addTrack = this.addTrack.bind(this); 
        //bind the current value of this to .addTrack()
        this.removeTrack = this.removeTrack.bind(this);
        //bind the current value of this to .removeTrack
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }
  

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return; 
    }//if id that were attempting to pass in matches the id in the track array return nothing

    tracks.push(track);
    this.setState({ playlistTracks: tracks })
    //else add to array of track objects 
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    // to retrieve the array of tracks from the playlist
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id); 
    //filter method looks at each item in the array 
    //current.track.id not equal to track.id
      
    this.setState({ playlistTracks: tracks });
    //sets the state
    //tracks new state will filter out the track the user clicked on to remove
  }

    updatePlaylistName(name) {
      this.setState({ playlistName: name });
    }

    savePlaylist() {
      const trackUris = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlayList(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'New PLaylist',
          playlistTracks: []
        })
      })
    } 
    //generates an array of uri values from the playlist track properties
     
    search(term) {
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults})
      })
    }
  

    render(){
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} /> 
            <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
            /> 
            {/*pass this.state.searchResults into seacrchResults component*/}
            

            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
            />
            </div>
          </div>
        </div>
      )
    }
  }
  


export default App;
