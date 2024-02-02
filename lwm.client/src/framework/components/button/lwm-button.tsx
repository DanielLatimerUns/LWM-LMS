import React from "react";
import "./lwm-button.css";

interface Props {
    onClick: Function
    name: string
    isSelected: boolean
}
 
interface State {
}
 
export default class LwmButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() { 
        return (
        <div 
            className={this.props.isSelected ? "lwmButton-selected" : "lwmButton"} 
            onClick={this.props.onClick.bind(this)}>
            <div>{this.props.name}</div>
        </div> );
    }
}
