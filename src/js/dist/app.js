var TRACKLIST = [{
	id: 1,
	name: "song a",
	source: "./audio/test.m4a"
}, {
	id: 2,
	name: "song b",
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
				"div",
				{ className: "name" },
				React.createElement(
					"h2",
					null,
					props.name
				)
			),
			React.createElement(
				"audio",
				null,
				React.createElement("source", { src: props.source })
			)
		),
		React.createElement("button", { className: "select", onClick: function () {
				props.onChange(props.source);
			} })
	);
}

var Application = React.createClass({
	displayName: "Application",


	getInitialState: function () {
		return {
			currentTrack: "./audio/test.m4a"
		};
	},

	onTrackChange: function (source) {
		this.setState({ currentTrack: source }, function () {
			this.refs.audio.pause();
			this.refs.audio.load();
			this.refs.audio.play();
		});
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
				{ className: "controls" },
				React.createElement(
					"audio",
					{ controls: true, ref: "audio" },
					React.createElement("source", { src: this.state.currentTrack })
				)
			)
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Application, { tracklist: TRACKLIST }), document.getElementById('Player'));