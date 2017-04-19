// Player
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
				source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
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

var Controls = React.createClass({
	displayName: 'Controls',

	render: function () {

		let classNames;
		if (this.props.isPlaying == 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}

		return React.createElement(
			'div',
			{ className: 'Controls' },
			React.createElement(
				'div',
				{ onClick: this.props.onClick, className: 'Button' },
				React.createElement('i', { className: classNames })
			)
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Player, null), document.getElementById('Player'));