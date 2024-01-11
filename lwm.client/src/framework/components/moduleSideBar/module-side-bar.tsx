import React from 'react';
import SideBarOption from '../../types/sideBarOption';
import './module-side-bar.css';

interface Props {
    userName: string
}
 
interface State {
    
}
 
export default class ModuleSideBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {  };
    }

    render() { 
        return this.renderPanel();
    }

    private renderPanel() {
        return(
            <div className='panelOuterContainer'>
                <div className='panelHeaderContainer'>
                    <div className='userContainer'>
                        <h1>
                            {this.props.userName}
                        </h1>
                    </div>
                </div>
                <div className='panelContentContainer'>
                    {this.renderContent()}
                </div>
                <div className='panelFooterContainer'>
                    {this.renderFooter()}
                </div>
            </div>
        )
    }

    private renderContent() {
        const options: SideBarOption[] = [];

        options.push({
            name: 'Control Center',
            module: 'control_center',
            active: true
        });

        options.push({
            name: 'People',
            module: 'people',
            active: true
        });

        options.push({
            name: 'Schedualing',
            module: 'schedualing',
            active: true
        });

        options.push({
            name: 'Timetable',
            module: 'timetable',
            active: true
        });

        return (
            options.map(option => 
            <div className='option'>
                <h2>{option.name}</h2>
            </div>)
        );
    }

    private renderFooter() {
        return <div><h2>Log out</h2></div>;
    }
}
