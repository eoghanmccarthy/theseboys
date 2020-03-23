import React, {Component} from 'react';

export default class Track extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className="track">
				<div className="meta">
					<h3 className="name">{this.props.name}</h3>
					<audio>
						<source src={this.props.source} />
					</audio>
				</div>
				<div className="select" onClick={() => {this.props.onChange(this.props.source);}} >
				</div>
			</div>
		);
	}
}
