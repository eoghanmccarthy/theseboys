import React from 'react';
import ReactDOM from 'react-dom';

let Player = React.createClass({
	render: function() { return (
		<h2>hey you! hi hey eoghan</h2>
	)}
});
ReactDOM.render(
	<Player />,
	document.getElementById('app')
);
