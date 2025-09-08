import './control-center.css'
import React, {JSX, useState} from 'react';
import ControlCenterAppletHost from './framework/control-center-applet-host';
import ControlCenterOptions from './applets/controlCenterOptions/applet/control-center-options';

interface Props {
}

const ControlCenter: React.FunctionComponent<Props> = () => {
    const [selectedApplet, setSelectedApplet] = useState<JSX.Element | string>(
        <ControlCenterOptions appletChange={handleAppletChange}/>
    );

    function handleAppletChange(selectedApplet: string) {
            setSelectedApplet(selectedApplet)
    }
    
    return (
        <div className="container">
            <div className='appletHostContainer'>
                <ControlCenterAppletHost>
                    {selectedApplet}
                </ControlCenterAppletHost>
            </div>
        </div>
    )
}

export default ControlCenter;
