import React from 'react';

import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value); //e.target.value = gives access to the keys user is typing
        //method we created in app.js will update the players name 
    }
    
    render () {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks}
                           onRemove={this.props.onRemove}
                           isRemoval={true}
                />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;