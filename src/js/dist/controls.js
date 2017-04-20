// Controls component
var Controls = React.createClass({
	displayName: 'Controls',

	render: function () {

		let classNames;
		if (this.props.isPlaying == 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}

		return React.createElement(
			'div',
			{ className: 'Controls' },
			React.createElement(
				'div',
				{ onClick: this.props.onClick, className: 'Button' },
				React.createElement('i', { className: classNames })
			)
		);
	}
});