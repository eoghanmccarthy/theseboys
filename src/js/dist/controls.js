// Keep working example

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

function Controls(props) {
	return React.createElement(
		"div",
		{ className: "controls" },
		React.createElement(
			"audio",
			{ controls: true },
			React.createElement("source", { src: props.source })
		)
	);
}

var Application = React.createClass({
	displayName: "Application",


	getInitialState: function () {
		return {
			isPlaying: "./audio/test.m4a"
		};
	},

	onTrackChange: function (source) {
		this.setState({ isPlaying: source });
	},

	componentDidUpdate() {
		console.log('Component DID UPDATE!');
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
			React.createElement(Controls, { source: this.state.isPlaying })
		);
	}
});

// Render the UI
ReactDOM.render(React.createElement(Application, { tracklist: TRACKLIST }), document.getElementById('Player'));