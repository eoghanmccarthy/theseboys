var TRACKLIST = [{
	id: 1,
	name: "#a",
	source: "./audio/test.m4a"
}, {
	id: 2,
	name: "#b",
	source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
}];

function Track(props) {
	return React.createElement(
		"div",
		{ className: "track" },
		React.createElement(
			"div",
			{ className: "meta" },
			React.createElement(
				"h3",
				{ className: "name" },
				props.name
			),
			React.createElement(
				"audio",
				null,
				React.createElement("source", { src: props.source })
			)
		),
		React.createElement("div", { className: "select", onClick: function () {
				props.onChange(props.source);
			} })
	);
}

function Controls(props) {

	let classNames;
	if (props.isPlaying == "play") {
		classNames = "fa fa-fw fa-pause";
	} else {
		classNames = "fa fa-fw fa-play";
	}

	return React.createElement(
		"div",
		{ className: "controls" },
		React.createElement(
			"div",
			{ onClick: props.onClick, className: "button" },
			React.createElement("i", { className: classNames })
		)
	);
}

var Application = React.createClass({
	displayName: "Application",


	getInitialState: function () {
		return {
			playStatus: "pause",
			currentTrack: "./audio/test.m4a"
		};
	},

	onTrackChange: function (source) {
		this.setState({ playStatus: "play" });
		this.setState({ currentTrack: source }, function () {
			this.refs.audio.pause();
			this.refs.audio.load();
			this.refs.audio.play();
		});
	},

	togglePlay: function () {
		let status = this.state.playStatus;
		let audio = this.refs.audio;
		if (status === "pause") {
			status = "play";
			audio.play();
		} else {
			status = "pause";
			audio.pause();
		}
		this.setState({ playStatus: status });
	},

	render: function () {
		return React.createElement(
			"div",
			{ className: "player" },
			React.createElement(
				"div",
				{ className: "tracklist" },
				this.props.tracklist.map(function (track) {
					return React.createElement(Track, {
						key: track.id,
						name: track.name,
						source: track.source,
						onChange: this.onTrackChange });
				}.bind(this))
			),
			React.createElement(
				"div",
				{ className: "controller" },
				React.createElement(Controls, { isPlaying: this.state.playStatus, onClick: this.togglePlay }),
				React.createElement(
					"audio",
					{ id: "audio", ref: "audio" },
					React.createElement("source", { src: this.state.currentTrack })
				)
			)
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Application, { tracklist: TRACKLIST }), document.getElementById('Player'));