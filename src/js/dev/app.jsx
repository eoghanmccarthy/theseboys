var TRACKLIST = [
	{
		id: 1,
		name: "song a",
		source: "./audio/test.m4a"
	},
	{
		id: 2,
		name: "song b",
		source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
	}
]

function Track(props) {
	return (
		<div className="track">
			<div className="meta">
				<div className="name">
					<h2>{props.name}</h2>
				</div>
				<audio>
					<source src={props.source} />
				</audio>
			</div>
			<button className="select" onClick={function() {props.onChange(props.source);}} >
			</button>
		</div>
	)
}

var Application = React.createClass({

	getInitialState: function() {
		return {
			currentTrack: "./audio/test.m4a"
		};
	},

	onTrackChange: function(source) {
		this.setState({ currentTrack: source },function(){
			this.refs.audio.pause();
			this.refs.audio.load();
			this.refs.audio.play();
		})
	},

	render: function() {
		return (
			<div className="player">
				<div className="tracklist">
					{this.props.tracklist.map(function(track){
						return <Track
									key={track.id}
									name={track.name}
									source={track.source}
									onChange={this.onTrackChange } />
					}.bind(this))}
				</div>
				<div className="controls">
					<audio controls ref="audio">
						<source src={this.state.currentTrack} />
					</audio>
				</div>
			</div>
		)
	}
});

// Render the UI
ReactDOM.render(
	<Application tracklist={TRACKLIST} />,
	document.getElementById('Player')
);
