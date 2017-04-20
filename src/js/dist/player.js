import React from 'react';
import ReactDOM from 'react-dom';

/// Audio player

// Import components
import Controls from './controls.jsx';

// Player component
var Player = React.createClass({
	displayName: 'Player',

	getInitialState: function () {
		return {
			playStatus: 'play'
		};
	},
	getDefaultProps: function () {
		return {
			track: {
				source: "./audio/test.m4a"
			}
		};
	},
	togglePlay: function () {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if (status === 'play') {
			status = 'pause';
			audio.play();
		} else {
			status = 'play';
			audio.pause();
		}
		this.setState({ playStatus: status });
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'Player' },
			React.createElement(Controls, { isPlaying: this.state.playStatus, onClick: this.togglePlay }),
			React.createElement(
				'audio',
				{ id: 'audio' },
				React.createElement('source', { src: this.props.track.source })
			)
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Player, null), document.getElementById('Player'));