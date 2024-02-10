import React, { Fragment, useState } from 'react';
import SideBarOption from '../../entities/framework/sideBarOption';
import './module-side-bar.css';
import LessonManager from '../lesson/lesson-manager';
import PersonManager from '../people/people-manager';
import GroupManager from '../group/group-manager';
import ScheduleManager from '../schedule/schedule-manager';
import LwmButton from '../../framework/components/button/lwm-button';
import LessonFeed from '../lesson-feed/lesson-feed';

import logo from '../../assets/lwm_logo.jpg';
import feedIcon from '../../assets/module-icons/bachelor.png';
import lessonIcon from '../../assets/module-icons/books.png';
import peopleIcon from '../../assets/module-icons/teamwork.png';
import groupIcon from '../../assets/module-icons/video-conference.png';
import schedualIcon from '../../assets/module-icons/school.png';

interface Props {
    userName: string
    onOptionSelectionChanged: Function;
}

const ModuleSideBar: React.FunctionComponent<Props> = (props) => {
    const _options: SideBarOption[] = [];

    _options.push({
        name: 'Feed',
        module: <LessonFeed></LessonFeed>,
        active: true,
        icon: feedIcon
    });

    _options.push({
        name: 'Lessons',
        module: <LessonManager></LessonManager>,
        active: false,
        icon: lessonIcon

    });

    _options.push({
        name: 'People',
        module: <PersonManager></PersonManager>,
        active: false,
        icon: peopleIcon
    });

    _options.push({
        name: 'Groups',
        module: <GroupManager></GroupManager>,
        active: false,
        icon: groupIcon
    });

    _options.push({
        name: 'Schedules',
        module: <ScheduleManager></ScheduleManager>,
        active: false,
        icon: schedualIcon
    });

    const [options, setOptions] = useState<SideBarOption[]>(_options);


    function renderContent() {
        return (
            options.map(option =>
                    <LwmButton
                        isSelected={option.active}
                        onClick={() => handleModuleSelectionClick(option)}
                        name={option.name}
                        icon={option.icon}/>
            )
        );
    }

    function renderFooter() {
        const footerOptions: SideBarOption[] = [];

        footerOptions.push({
            name: 'Log Out',
            module: <div></div>,
            active: true,
            icon: ''
        });

        return (
            <Fragment>
                <div className='usernameContainer'>
                    Kristina
                </div>
                    {(footerOptions.map(option =>
                    <LwmButton
                        isSelected={false}
                        onClick={() => handleModuleSelectionClick(option)}
                        name={option.name}>
                    </LwmButton>))}
            </Fragment>);
    }

    function handleModuleSelectionClick(option: SideBarOption) {
        if (option.name === "Log Out") {
            dispatchEvent(new Event("app-logout"));
            return;
        }

        const updatedOptions = options;

        updatedOptions.forEach(x => x.active = x.name === option.name);

        setOptions(updatedOptions);
        props.onOptionSelectionChanged(option);
    }

    return(
        <div className='panelOuterContainer'>
            <div className='panelHeaderContainer'>
                <div className='panelHeaderLogo'>
                    <img src={logo}></img>
                </div>
            </div>
            <div className='panelContentContainer'>
                {renderContent()}
            </div>
            <div className='panelUserContainer'>
                {renderFooter()}
            </div>
        </div>
    )
}

export default ModuleSideBar;
