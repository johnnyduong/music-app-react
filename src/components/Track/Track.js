import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }

    addTrack(event) {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        if(this.props.isRemoval) {
            return (<button className="Track-action" onClick={this.removeTrack}> - </button>);
        }
        
        return (<button className="Track-action" onClick={this.addTrack}> + </button>);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h2>{this.props.track.name}</h2>
                    <p>
                        
                        {this.props.track.artist} | {this.props.track.album}
                        
                    </p>
                    <p>
                        <iframe
                            src={"https://open.spotify.com/embed/track/" + this.props.track.id}
                            width="300"
                            height="80"
                            frameBorder="0"
                            allow="encrypted-media"
                            title="preview"
                        />
                        {this.renderAction()}
                    </p>
                </div>
            </div>       
        );
    }
}

export default Track;