import React from 'react'
import './module-loader.css'
import {GetModules, ModuleDefinition} from "../../../entities/framework/moduleDefinition.ts";
import {Outlet, useRouteLoaderData} from "react-router";

interface Props {}

const TimeTableModuleLoaderEditorEntry: React.FunctionComponent<Props> = () => {
    let module: ModuleDefinition | undefined = undefined;
    
    for (const _module of GetModules()) {
        const activeModule = useRouteLoaderData(_module.name) as ModuleDefinition;
        
        if (activeModule) {
            module = activeModule;
        }
    }
    
    if (!module) {
        return;
    }
    
    return (
        <div className="moduleLoaderContainer">
            <div className={"moduleLoaderModule"}>
                <div className="moduleLoaderHeader">
                    <img src={module.icon}/>
                    <h2>{module.name}</h2>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default TimeTableModuleLoaderEditorEntry;