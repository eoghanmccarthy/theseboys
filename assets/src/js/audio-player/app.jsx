import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import Track from './components/track';
import Controls from './components/controls';

var TRACKLIST = [
	{
		id: 1,
		name: "#a",
		source: "./assets/dist/audio/shibuya_src.m4a"
	},
	{
		id: 2,
		name: "#b",
		source: "./assets/dist/audio/shinjuku_src.m4a"
	}
]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.onTrackChange = this.onTrackChange.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.state = {
			playStatus: "standby"
		};
	}
	// Re-load audio on track change
	onTrackChange(source) {
		this.setState({ playStatus: "play" });
		this.setState({ currentTrack: source },function(){
			this.refs.audio.pause();
			this.refs.audio.load();
			this.refs.audio.play();
		})
	}
	// Toggle audio
	togglePlay() {
		let status = this.state.playStatus;
		let audio = this.refs.audio;
		if(status === "pause") {
			status = "play";
			audio.play();
		} else if(status === "play") {
			status = "pause";
			audio.pause();
		}
		this.setState({ playStatus: status })
	}

	render() {
		return (
			<div className="player">
				<div className="tracklist">
					{this.props.tracklist.map(function(track){
						return <Track
									key={track.id}
									name={track.name}
									source={track.source}
									onChange={this.onTrackChange} />
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
}

// Render the UI
ReactDOM.render(
	<App tracklist={TRACKLIST} />,
	document.getElementById('Player')
);
