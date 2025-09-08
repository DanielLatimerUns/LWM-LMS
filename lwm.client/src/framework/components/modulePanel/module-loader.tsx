import React from 'react'
import './module-loader.css'
import {Outlet} from "react-router";
import {getActiveModule} from "../../../services/network/modules/moduleService.ts";
import {ModuleDefinition} from "../../../entities/framework/moduleDefinition.ts";
import AuthService from "../../../services/network/authentication/authService.ts";
import LwmButton from "../button/lwm-button.tsx";

interface Props {}

const TimeTableModuleLoaderEditorEntry: React.FunctionComponent<Props> = () => {
    const module: ModuleDefinition = getActiveModule();

    function renderAccountSection() {
        const footerOptions: ModuleDefinition[] = [];
        footerOptions.push({
            name: 'Log Out',
            module: () => <div></div>,
            active: true,
            icon: '',
            navLink: ''
        });

        const currentUserName = AuthService.GetCurrentUser()?.user.userName;

        return (
            <div className='moduleLoaderHeaderAccount'>
                <div className='usernameContainer'>
                    {currentUserName}
                </div>
                {(footerOptions.map(option =>
                    <LwmButton
                        isSelected={false}
                        onClick={() => {dispatchEvent(new Event("app-logout"))}}
                        name={option.name}>
                    </LwmButton>))}
            </div>);
    }
    
    return (
        <div className="moduleLoaderContainer">
            <div className="moduleLoaderHeaderContainer">
                <div className="moduleLoaderHeader">
                    <img src={module?.icon}/>
                    <h2>{module?.name}</h2>
                </div>
                {renderAccountSection()}
            </div>
                <Outlet/>
        </div>
    );
}

export default TimeTableModuleLoaderEditorEntry;