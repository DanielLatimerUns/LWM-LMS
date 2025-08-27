import React, { useState } from "react";
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import { SideBarOption } from "../entities/framework/sideBarOption";
import AuthService from "../services/network/authentication/authService";
import LoginSplash from "./authentication/login-spash/login-splash";

interface Props {}

 const App: React.FunctionComponent<Props> = () => {
    const [activeModule, setActiveModule] = useState<SideBarOption>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isLoggedIn());
    const [initialisedModules, setInitialisedModules] = useState<JSX.Element[]>([])

    addEventListener("app-logout", handleLogout, true);
    
    function onActiveModuleChange (option: SideBarOption) {
        
        if (initialisedModules.includes(option.module)) {
            setActiveModule(option);
            return;
        }                                                                                                                                                                                                                                                                                  
        
        const initialisedModuleList = [...initialisedModules, option.module];
        setInitialisedModules(initialisedModuleList);
        
        setActiveModule(option);
    }

    function onLoginComplete() {
        setIsAuthenticated(true);
    }

    function handleLogout() {
        AuthService.Logout();
        setIsAuthenticated(false);
    }

     if (isAuthenticated) {
         return (
             <div className="appOuterContainer">
                 <ModuleSideBar
                     onOptionSelectionChanged={onActiveModuleChange}>
                 </ModuleSideBar>
                 <ModuleLoader activeModule={activeModule}>
                     {initialisedModules}
                 </ModuleLoader>
             </div>);
     }

     return (
         <div className="appOuterContainer-login-spalsh">
             <LoginSplash onLoginSuccsess={onLoginComplete}/>
         </div>);
}

export default App;