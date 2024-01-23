import React from "react";
import ControlOption from "../../../../../entities/framework/option";

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
            name: 'Test Applet',
            applet: 'test'
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
        );;
    }
}
