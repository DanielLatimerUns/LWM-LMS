import React, { Fragment, useState } from 'react';
import {NavLink, useRouteLoaderData} from "react-router";
import { ModuleDefinition, GetModules } from '../../entities/framework/moduleDefinition.ts';
import './module-side-bar.css';
import LwmButton from '../../framework/components/button/lwm-button';

import logo from '../../assets/lwm_logo.jpg';
import AuthService from "../../services/network/authentication/authService.ts";

interface Props {}

const ModuleSideBar: React.FunctionComponent<Props> = () => {
    const [options] = useState<ModuleDefinition[]>(GetModules());

    let module: ModuleDefinition | undefined = undefined;

    for (const _module of GetModules()) {
        const activeModule = useRouteLoaderData(_module.name) as ModuleDefinition;

        if (activeModule) {
            module = activeModule;
        }
    }
    
    function renderContent() {
        return (
            options.map(option =>
                    <LwmButton
                        isSelected={module?.name === option.name}
                        onClick={() => {}}>
                        <NavLink to={option.navLink} end>
                            <div>
                                <img src={option.icon}/>
                            </div>
                            <div>
                                {option.name}
                            </div>
                        </NavLink>
                    </LwmButton>
            )
        );
    }

    function renderFooter() {
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
            <Fragment>
                <div className='usernameContainer'>
                    {currentUserName}
                </div>
                    {(footerOptions.map(option =>
                    <LwmButton
                        isSelected={false}
                        onClick={() => handleModuleSelectionClick(option)}
                        name={option.name}>
                    </LwmButton>))}
            </Fragment>);
    }

    function handleModuleSelectionClick(option: ModuleDefinition) {
        if (option.name === "Log Out") {
            dispatchEvent(new Event("app-logout"));
            return;
        }
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
