import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Import components
import Tracklist from './components/tracklist';
import Controls from './components/controls';

// Import data
import trackdata from 'json-loader!../../data/trackdata.json';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.onTrackChange = this.onTrackChange.bind(this);
		this.toggleAudio = this.toggleAudio.bind(this);
		this.state = {
			playStatus: "standby",
			tracklist: trackdata.data
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
	toggleAudio() {
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
				<Tracklist tracklist={this.state.tracklist} onTrackChange={this.onTrackChange} />
				<div className="controller">
					<Controls isPlaying={this.state.playStatus} toggleAudio={this.toggleAudio} />
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
	<App />,
	document.getElementById('Player')
);
