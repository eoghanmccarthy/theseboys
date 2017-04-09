let Greeting = React.createClass({
	displayName: 'Greeting',

	render: function () {
		return React.createElement(
			'h2',
			null,
			this.props.message
		);
	}
});

setInterval(function () {
	var messages = ['boom', 'bop', 'clap'];
	var randomMessage = messages[Math.floor(Math.random() * 3)];

	ReactDOM.render(React.createElement(Greeting, { message: randomMessage }), document.getElementById('app'));
}, 2000);