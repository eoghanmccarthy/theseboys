var TRACKLIST = [
	{
		id: 1,
		name: "#a",
		source: "./audio/track_a.m4a"
	},
	{
		id: 2,
		name: "#b",
		source: "./audio/track_b.m4a"
	}
]

function Track(props) {
	return (
		<div className="track">
			<div className="meta">
				<h3 className="name">{props.name}</h3>
				<audio>
					<source src={props.source} />
				</audio>
			</div>
			<div className="select" onClick={function() {props.onChange(props.source);}} >
			</div>
		</div>
	)
}

function Controls(props) {

	let classNames;
	if (props.isPlaying == "play") {
		classNames = "fa fa-fw fa-pause";
	} else {
		classNames = "fa fa-fw fa-play";
	}

	return (
		<div className="controls">
			<div onClick={props.onClick} className="button">
				<i className={classNames}></i>
			</div>
		</div>
	)
}

var Application = React.createClass({

	getInitialState: function() {
		return {
			playStatus: "pause",
			currentTrack: "./audio/track_a.m4a"
		};
	},

	onTrackChange: function(source) {
		this.setState({ playStatus: "play" });
		this.setState({ currentTrack: source },function(){
			this.refs.audio.pause();
			this.refs.audio.load();
			this.refs.audio.play();
		})
	},

	togglePlay: function() {
		let status = this.state.playStatus;
		let audio = this.refs.audio;
		if(status === "pause") {
			status = "play";
			audio.play();
		} else {
			status = "pause";
			audio.pause();
		}
		this.setState({ playStatus: status })
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
				<div className="controller">
					<Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
					<audio id="audio" ref="audio">
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
