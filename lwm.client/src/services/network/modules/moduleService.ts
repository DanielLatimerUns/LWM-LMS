import {GetModules, ModuleDefinition} from "../../../entities/framework/moduleDefinition";
import {useRouteLoaderData} from "react-router";

export const getActiveModule: Function = () => {
    let module: ModuleDefinition | undefined =
        useRouteLoaderData('_default') as ModuleDefinition;

    if (!module) {
        for (const _module of GetModules()) {
            const activeModule = useRouteLoaderData(_module.name) as ModuleDefinition;

            if (activeModule) {
                module = activeModule;
            }
        }

    }
    
    return module;
}