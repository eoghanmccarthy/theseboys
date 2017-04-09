let Player = React.createClass({
	displayName: 'Player',

	render: function () {
		return React.createElement(
			'h2',
			null,
			'hey you! hi'
		);
	}
});
ReactDOM.render(React.createElement(Player, null), document.getElementById('app'));