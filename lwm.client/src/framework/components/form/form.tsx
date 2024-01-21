import React from "react";
import './form.css'

interface Props {
    children: JSX.Element[];
}
 
interface State {
    
}
 
export default class Form extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() { 
        return ( 
            <div className="formFieldContainer">
                {this.props.children.map(field => 
                    <div className="formField">
                        <label>{field.key}</label> <div>{field}</div>
                    </div>)}
            </div>
         );
    }
}
