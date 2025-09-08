import React, { useState } from 'react';
import {NavLink} from "react-router";
import { ModuleDefinition, GetModules } from '../../entities/framework/moduleDefinition.ts';
import './menu-bar.css';
import LwmButton from '../../framework/components/button/lwm-button';
import {getActiveModule} from "../../services/network/modules/moduleService.ts";

interface Props {}

const MenuBar: React.FunctionComponent<Props> = () => {
    const [options] = useState<ModuleDefinition[]>(GetModules());

    const module: ModuleDefinition = getActiveModule();
    
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
    
    return (
        <div className='panelOuterContainer'>
            <div className='panelContentContainer'>
                {renderContent()}
            </div>
        </div>
    )
}

export default MenuBar;
