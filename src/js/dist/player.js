/// Audio player

// Player component
var Player = React.createClass({
	displayName: "Player",

	getInitialState: function () {
		return {
			playStatus: 'play',
			currentTime: 0
		};
	},
	getDefaultProps: function () {
		return {
			track: {
				name: "everything we do is a work in progress",
				source: "./audio/test.m4a",
				duration: 57
			}
		};
	},
	updateTime: function (timestamp) {
		timestamp = Math.floor(timestamp);
		this.setState({ currentTime: timestamp });
	},
	togglePlay: function () {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if (status === 'play') {
			status = 'pause';
			audio.play();
			let that = this;
			setInterval(function () {
				let currentTime = audio.currentTime;
				that.updateTime(currentTime);
			}, 100);
		} else {
			status = 'play';
			audio.pause();
		}
		this.setState({ playStatus: status });
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "Player" },
			React.createElement(Controls, { isPlaying: this.state.playStatus, onClick: this.togglePlay }),
			React.createElement(TrackInformation, { track: this.props.track }),
			React.createElement(Timestamps, { duration: this.props.track.duration, currentTime: this.state.currentTime }),
			React.createElement(
				"audio",
				{ id: "audio" },
				React.createElement("source", { src: this.props.track.source })
			)
		);
	}
});

var TrackInformation = React.createClass({
	displayName: "TrackInformation",

	render: function () {
		return React.createElement(
			"div",
			{ className: "TrackInformation" },
			React.createElement(
				"div",
				{ className: "Name" },
				React.createElement(
					"h3",
					null,
					this.props.track.name
				)
			)
		);
	}
});

var Controls = React.createClass({
	displayName: "Controls",

	render: function () {

		let classNames;
		if (this.props.isPlaying == 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}

		return React.createElement(
			"div",
			{ className: "Controls" },
			React.createElement(
				"div",
				{ onClick: this.props.onClick, className: "Button" },
				React.createElement("i", { className: classNames })
			)
		);
	}
});

var Timestamps = React.createClass({
	displayName: "Timestamps",

	convertTime: function (timestamp) {
		let minutes = Math.floor(timestamp / 60);
		let seconds = timestamp - minutes * 60;
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		timestamp = minutes + ':' + seconds;
		return timestamp;
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "Timestamps" },
			React.createElement(
				"div",
				{ className: "Time Time--current" },
				this.convertTime(this.props.currentTime)
			),
			React.createElement(
				"div",
				{ className: "Time Time--total" },
				this.convertTime(this.props.duration)
			)
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Player, null), document.getElementById('Player'));