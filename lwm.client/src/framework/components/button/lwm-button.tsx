import React, {JSX} from "react";
import "./lwm-button.css";

interface Props {
    onClick: Function
    name?: string
    isSelected: boolean
    children?: JSX.Element
    icon?: string;
}

const LwmButton: React.FunctionComponent<Props> = (props: Props) => {
   function buildIcon() {
        if (props.icon) {
            return <img src={props.icon}></img>;
        }

        return "";
    }
    
    return (
            <div
                className={props.isSelected ? "lwmButton-selected" : "lwmButton"}
                onClick={props.onClick.bind(this)}>
                {buildIcon()}
                {props.name ?? props.children}
            </div> 
    );
}

export default LwmButton;