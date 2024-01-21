import React from 'react';
import SideBarOption from '../../types/sideBarOption';
import './module-side-bar.css';
import LessonManager from '../../../applets/lesson/applet/lesson-manager';
import ControlCenter from '../../../applets/controlCenter/applet/control-center';
import userImage from '../../../assets/user1.png';
import PersonManager from '../../../applets/people/applet/people-manager';

interface Props {
    userName: string
    onOptionSelectionChanged: Function;
}
 
interface State {
    options: SideBarOption[];
}
 
export default class ModuleSideBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const options: SideBarOption[] = [];

        options.push({
            name: 'Lessons',
            module: <LessonManager></LessonManager>,
            active: true
        });

        options.push({
            name: 'People',
            module: <PersonManager></PersonManager>,
            active: false
        });

        options.push({
            name: 'Schedualing',
            module: <div></div>,
            active: false
        });

        options.push({
            name: 'Timetable',
            module: <div></div>,
            active: false
        });

        this.state = {options: options};
    }

    render() { 
        return this.renderPanel();
    }

    private renderPanel() {
        return(
            <div className='panelOuterContainer'>
                <div className='panelHeaderContainer'>
                    <div className='userContainer'>
                        <div className='userIcon'>
                            <img src={userImage}></img>
                        </div>
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
        return (
            this.state.options.map(option => 
            <div className={option.active ? 'option-selected' : 'option'} onClick={this.handleModuleSelectionClick.bind(this, option)}>
                <div>{option.name}</div>
            </div>)
        );
    }

    private renderFooter() {
        const footerOptions: SideBarOption[] = [];

        footerOptions.push({
            name: 'Control Center',
            module: <ControlCenter></ControlCenter>,
            active: true
        });

        footerOptions.push({
            name: 'Log Out',
            module: <div></div>,
            active: true
        });


        return (
            <div>
                <div>
                    {(footerOptions.map(option => 
                    <div className='footerOption' onClick={this.handleModuleSelectionClick.bind(this, option)}>
                        {option.name}
                    </div>))}
                </div>
            </div>);
    }

    private handleModuleSelectionClick(option: SideBarOption) {
        const updatedOptions = this.state.options;

        updatedOptions.forEach(x => x.active = x.name === option.name);
        
        this.setState({options: updatedOptions});
        this.props.onOptionSelectionChanged(option);
    }
}
