// Player
var Player = React.createClass({
	displayName: "Player",

	getInitialState: function () {
		return {
			playStatus: 'play'
		};
	},
	getDefaultProps: function () {
		return {
			track: {
				name: "We Were Young",
				// artist: "Odesza",
				// album: "Summer's Gone",
				// year: 2012,
				// artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
				// duration: 192,
				source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
			}
		};
	},
	// updateTime: function(timestamp) {
	// 	timestamp = Math.floor(timestamp);
	// 	this.setState({ currentTime: timestamp });
	// },
	// updateScrubber: function(percent) {
	// 	// Set scrubber width
	// 	let innerScrubber = document.querySelector('.Scrubber-Progress');
	// 	innerScrubber.style['width'] = percent;
	// },
	togglePlay: function () {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if (status === 'play') {
			status = 'pause';
			audio.play();
			// let that = this;
			// setInterval(function() {
			// 	let currentTime = audio.currentTime;
			// 	let duration = that.props.track.duration;
			//
			// 	// Calculate percent of song
			// 	let percent = (currentTime / duration) * 100 + '%';
			// 	that.updateScrubber(percent);
			// 	that.updateTime(currentTime);
			// }, 100);
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
			"// ",
			React.createElement("div", { className: "Background", style: { 'backgroundImage': 'url(' + this.props.track.artwork + ')' } }),
			"// ",
			React.createElement(
				"div",
				{ className: "Header" },
				React.createElement(
					"div",
					{ className: "Title" },
					"Now playing"
				)
			),
			"// ",
			React.createElement("div", { className: "Artwork", style: { 'backgroundImage': 'url(' + this.props.track.artwork + ')' } }),
			React.createElement(TrackInformation, { track: this.props.track }),
			"// ",
			React.createElement(Scrubber, null),
			React.createElement(Controls, { isPlaying: this.state.playStatus, onClick: this.togglePlay }),
			"// ",
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
				this.props.track.name
			),
			"// ",
			React.createElement(
				"div",
				{ className: "Artist" },
				this.props.track.artist
			),
			"// ",
			React.createElement(
				"div",
				{ className: "Album" },
				this.props.track.album,
				" (",
				this.props.track.year,
				")"
			)
		);
	}
});

// var Scrubber = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="Scrubber">
// 				<div className="Scrubber-Progress"></div>
// 			</div>
// 		)
// 	}
// });

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

// var Timestamps = React.createClass({
// 	convertTime: function(timestamp) {
// 		let minutes = Math.floor(timestamp / 60);
// 		let seconds = timestamp - (minutes * 60);
// 		if(seconds < 10) {
// 			seconds = '0' + seconds;
// 		}
// 		timestamp = minutes + ':' + seconds;
// 		return timestamp;
// 	},
// 	render: function() {
// 		return (
// 			<div className="Timestamps">
// 				<div className="Time Time--current">{this.convertTime(this.props.currentTime)}</div>
// 				<div className="Time Time--total">{this.convertTime(this.props.duration)}</div>
// 			</div>
// 		)
// 	}
// });


// Render the UI
ReactDOM.render(React.createElement(Player, null), document.getElementById('Player'));
