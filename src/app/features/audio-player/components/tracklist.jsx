import React, {Component} from 'react';

// Import components
import Track from './track';

export default class Tracklist extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className="tracklist">
				{this.props.tracklist.map(function(track){
					return <Track
								key={track.id}
								name={track.name}
								source={track.source}
								onChange={this.props.onTrackChange} />
				}.bind(this))}
			</div>
		);
	}
}
