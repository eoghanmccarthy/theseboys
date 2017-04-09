let Greeting = React.createClass({
	render: function() { return (
		<h2>{this.props.message}</h2>
	)}
});

setInterval(function() {
	var messages = ['boom', 'bop', 'clap'];
	var randomMessage = messages[Math.floor((Math.random() * 3))];

	ReactDOM.render(
		<Greeting message={randomMessage}/>,
		document.getElementById('app')
	);
}, 2000);
