import React from "react";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}
 
interface State {
    
}
 
export default class ControlCenterAppletHost extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() { 
        return ( 
            <div className='container'>
                {this.props.children}
            </div>
         );
    }
}
