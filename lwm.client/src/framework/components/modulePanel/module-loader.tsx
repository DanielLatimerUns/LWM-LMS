import React from 'react'
import './module-loader.css'

interface Props {
    children: string | JSX.Element | JSX.Element[];
}
 
interface State {
    
}
 
export default class ModuleLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return ( 
            <div className="moduleLoaderContainer">
                {this.props.children}
            </div>
         );
    }
}
