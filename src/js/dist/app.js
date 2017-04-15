let RandomMessage = React.createClass({
	displayName: 'RandomMessage',

	getInitialState: function () {
		return { message: 'Hello, Universe' };
	},
	onClick: function () {
		let messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe'];
		let randomMessage = messages[Math.floor(Math.random() * 3)];

		this.setState({ message: randomMessage });
	},
	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(MessageView, { message: this.state.message }),
			React.createElement(
				'p',
				null,
				React.createElement('input', { type: 'button', onClick: this.onClick, value: 'Change Message' })
			)
		);
	}
});

let MessageView = React.createClass({
	displayName: 'MessageView',

	render: function () {
		return React.createElement(
			'p',
			null,
			this.props.message
		);
	}
});

ReactDOM.render(React.createElement(RandomMessage, null), document.getElementById('app'));