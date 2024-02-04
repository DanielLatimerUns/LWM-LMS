import React, { Fragment } from 'react';
import SideBarOption from '../../entities/framework/sideBarOption';
import './module-side-bar.css';
import LessonManager from '../lesson/lesson-manager';
import ControlCenter from '../controlCenter/control-center';
import PersonManager from '../people/people-manager';
import GroupManager from '../group/group-manager';
import ScheduleManager from '../schedule/schedule-manager';
import LwmButton from '../../framework/components/button/lwm-button';
import LessonFeed from '../lesson-feed/lesson-feed';
import logo from '../../assets/lwm_logo.jpg';

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
            active: true,
            icon: '/src/assets/module-icons/bachelor.png'
        });

        options.push({
            name: 'Lessons',
            module: <LessonManager></LessonManager>,
            active: false,
            icon: '/src/assets/module-icons/books.png'
            
        });

        options.push({
            name: 'People',
            module: <PersonManager></PersonManager>,
            active: false,
            icon: '/src/assets/module-icons/teamwork.png'
        });

        options.push({
            name: 'Groups',
            module: <GroupManager></GroupManager>,
            active: false,
            icon: '/src/assets/module-icons/video-conference.png'
        });

        options.push({
            name: 'Schedules',
            module: <ScheduleManager></ScheduleManager>,
            active: false,
            icon: '/src/assets/module-icons/school.png'
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
                    <img src={logo}></img>
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
                <div onClick={this.handleModuleSelectionClick.bind(this, option)}>
                    <img src={option.icon}></img>
                    <LwmButton isSelected={option.active} onClick={this.handleModuleSelectionClick.bind(this, option)} name={option.name}/>
                </div>
            )
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
            <Fragment>
                    {(footerOptions.map(option => 
                    <LwmButton 
                        isSelected={false} 
                        onClick={this.handleModuleSelectionClick.bind(this, option)}
                        name={option.name}>
                    </LwmButton>))}
            </Fragment>);
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
