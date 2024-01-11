import React, { ReactComponentElement } from 'react'
import ControlCenter from '../../../applets/controlCenter/applet/control-center';

interface Props {
    appletToRender: string
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
            <div className='container'>
                {this.renderApplet()}
            </div>
         );
    }

    private renderApplet() {
        switch(this.props.appletToRender) {
            case 'control_center':
                return <ControlCenter></ControlCenter>
            default: return <div></div>
        }
    }
}
