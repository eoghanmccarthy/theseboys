// Player component
var Player = React.createClass({
	getInitialState: function() {
		return {
			playStatus: 'play',
		}
	},
	getDefaultProps: function() {
		return {
			track: {
				source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
			}
		}
	},
	togglePlay: function() {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if(status === 'play') {
			status = 'pause';
			audio.play();
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
				<audio id="audio">
					<source src={this.props.track.source} />
				</audio>
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

// Render the UI
ReactDOM.render(
	<Player />,
	document.getElementById('Player')
);
