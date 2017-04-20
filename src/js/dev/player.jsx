import React from 'react';
import ReactDOM from 'react-dom';

/// Audio player

// Import components
import Controls from './controls.jsx';

// Player component
var Player = React.createClass({
	getInitialState: function() {
		return {
			playStatus: 'play',
		}
	},
	getDefaultProps: function() {
		return {
			track: {
				source: "./audio/test.m4a"
			}
		}
	},
	togglePlay: function() {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if(status === 'play') {
			status = 'pause';
			audio.play();
		} else {
			status = 'play';
			audio.pause();
		}
		this.setState({ playStatus: status });

	},
	render: function() {
		return (
			<div className="Player">
				<Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
				<audio id="audio">
					<source src={this.props.track.source} />
				</audio>
			</div>
		)
	}
});

// Render the UI
ReactDOM.render(
	<Player />,
	document.getElementById('Player')
);
