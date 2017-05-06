import React from 'react';

export default class Controls extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){

		let classNames = "";
		if (this.props.isPlaying == "standby") {
			classNames = "fa fa-fw fa-play standby";
		} else if(this.props.isPlaying == "play") {
			classNames = "fa fa-fw fa-pause";
		} else {
			classNames = "fa fa-fw fa-play";
		}
		
		return (
			<div className="controls">
				<div className="button" onClick={this.props.onClick}>
					<i className={classNames}></i>
				</div>
			</div>
		);
	}
}
