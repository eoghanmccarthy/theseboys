/// Audio player

// Player component
var Player = React.createClass({
	getInitialState: function() {
		return {
			playStatus: 'play',
			currentTime: 0
		}
	},
	getDefaultProps: function() {
		return {
			track: {
				name: "everything we do is a work in progress",
				source: "./audio/test.m4a",
				duration: 57
			}
		}
	},
	updateTime: function(timestamp) {
		timestamp = Math.floor(timestamp);
		this.setState({ currentTime: timestamp });
	},
	togglePlay: function() {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if(status === 'play') {
			status = 'pause';
			audio.play();
			let that = this;
			setInterval(function() {
				let currentTime = audio.currentTime;
				that.updateTime(currentTime);
			}, 100);
		} else {
			status = 'play';
			audio.pause();
		}
		this.setState({ playStatus: status });

	},
	render: function() {
		return (
			<div className="Player">
				<Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
				<TrackInformation track={this.props.track} />
				<Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
				<audio id="audio">
					<source src={this.props.track.source} />
				</audio>
			</div>
		)
	}
});

var TrackInformation = React.createClass({
	render: function() {
		return (
			<div className="TrackInformation">
				<div className="Name"><h3>{this.props.track.name}</h3></div>
			</div>
		)
	}
});

var Controls = React.createClass({
	render: function() {

		let classNames;
		if (this.props.isPlaying == 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}

		return (
			<div className="Controls">
				<div onClick={this.props.onClick} className="Button">
					<i className={classNames}></i>
				</div>
			</div>
		)
	}
});

var Timestamps = React.createClass({
	convertTime: function(timestamp) {
		let minutes = Math.floor(timestamp / 60);
		let seconds = timestamp - (minutes * 60);
		if(seconds < 10) {
			seconds = '0' + seconds;
		}
		timestamp = minutes + ':' + seconds;
		return timestamp;
	},
	render: function() {
		return (
			<div className="Timestamps">
				<div className="Time Time--current">{this.convertTime(this.props.currentTime)}</div>
				<div className="Time Time--total">{this.convertTime(this.props.duration)}</div>
			</div>
		)
	}
});

// Render the UI
ReactDOM.render(
	<Player />,
	document.getElementById('Player')
);
