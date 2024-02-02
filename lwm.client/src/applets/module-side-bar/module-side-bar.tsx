import React from 'react';
import SideBarOption from '../../entities/framework/sideBarOption';
import './module-side-bar.css';
import LessonManager from '../lesson/lesson-manager';
import ControlCenter from '../controlCenter/control-center';
import userImage from '../../assets/user1.png'
import PersonManager from '../people/people-manager';
import GroupManager from '../group/group-manager';
import ScheduleManager from '../schedule/schedule-manager';
import LwmButton from '../../framework/components/button/lwm-button';
import LessonFeed from '../lesson-feed/lesson-feed';

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
            name: 'Feed',
            module: <LessonFeed></LessonFeed>,
            active: true
        });

        options.push({
            name: 'Lessons',
            module: <LessonManager></LessonManager>,
            active: false
        });

        options.push({
            name: 'People',
            module: <PersonManager></PersonManager>,
            active: false
        });

        options.push({
            name: 'Groups',
            module: <GroupManager></GroupManager>,
            active: false
        });

        options.push({
            name: 'Schedules',
            module: <ScheduleManager></ScheduleManager>,
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
            <LwmButton isSelected={option.active} onClick={this.handleModuleSelectionClick.bind(this, option)} name={option.name}>
            </LwmButton>)
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
        if (option.name === "Log Out") {
            dispatchEvent(new Event("app-logout"));
            return;
        }

        const updatedOptions = this.state.options;

        updatedOptions.forEach(x => x.active = x.name === option.name);
        
        this.setState({options: updatedOptions});
        this.props.onOptionSelectionChanged(option);
    }
}
