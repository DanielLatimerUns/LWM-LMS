import React from "react";
import {ControlOption} from "../../../../../entities/framework/option";
import UserManager from "../../UserManager/user-manager.tsx";

interface Props {
    appletChange: Function;
}
 
interface State {
    options: ControlOption[];
}
 
export default class ControlCenterOptions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const options: ControlOption[] = [];

        options.push({
            name: 'User Management',
            applet: <UserManager></UserManager>
        });
        
        this.state = {options};

        this.handleControlOptionClick = this.handleControlOptionClick.bind(this);
    }

    render() { 
        return this.buildOptions();
    }

    private handleControlOptionClick(option: ControlOption) {
        this.props.appletChange(option.applet);
    }
 
    private buildOptions() {
        return this.state.options.map(option => 
            <div className='option'>
                <button onClick={() =>this.handleControlOptionClick(option)}>
                    {option.name}
                </button>
            </div>
        );
    }
}
