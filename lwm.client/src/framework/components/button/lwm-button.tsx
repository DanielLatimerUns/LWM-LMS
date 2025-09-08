import React, {JSX} from "react";
import "./lwm-button.css";

interface Props {
    onClick: Function
    name?: string
    isSelected: boolean
    children?: JSX.Element
    icon?: string;
    buttonType?: string;
}

const LwmButton: React.FunctionComponent<Props> = (props: Props) => {
   function buildIcon() {
        if (props.icon) {
            return <img src={props.icon}></img>;
        }

        return "";
    }
    
    const classes: string[] = [];
   
   classes.push("lwmButton");
   
    if (props.buttonType === "add") {
        classes.push("lwmButtonAdd");
    }
    
    if (props.buttonType === "delete") {
        classes.push("lwmButtonDelete");
    } 
    
    if (props.isSelected) {
        classes.push("lwmButton-selected");
    }
    
    return (
            <div
                className={classes.join(" ")}
                onClick={props.onClick.bind(this)}>
                {buildIcon()}
                {props.name ?? props.children}
            </div> 
    );
}

export default LwmButton;