import './control-center.css'
import React from 'react';
import ControlCenterAppletHost from './framework/control-center-applet-host';
import ControlCenterOptions from './applets/controlCenterOptions/applet/control-center-options';

interface IProps {
}

interface IState {
  selectedApplet: string | JSX.Element;
}

export default class ControlCenter extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = 
            {selectedApplet: <ControlCenterOptions appletChange={this.handleAppletChange.bind(this)}>
            </ControlCenterOptions>}
    }
    
    render() {
        return (
            <div className="container">
                <div className='appletHostContainer'>
                    <ControlCenterAppletHost>
                        {this.state.selectedApplet}
                    </ControlCenterAppletHost>
                </div>
            </div>
        )
    }

    private handleAppletChange(selectedApplet: string) {
        this.setState(() => {
            return { selectedApplet: selectedApplet }
          });
    }
}
