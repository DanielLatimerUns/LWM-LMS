import React from "react";
import "./lwm-button.css";

interface Props {
    onClick: Function
    name: string
    isSelected: boolean
    children?: JSX.Element
    icon?: string;
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
            {this.buildIcon()}
            <div>{this.props.name ?? this.props.children}</div>
        </div> );
    }

    private buildIcon() {
        if (this.props.icon) {
            return <img src={this.props.icon}></img>;
        }

        return "";
    }
}
