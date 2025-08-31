import React, { useState } from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import './app.css';
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
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
    
    const queryClient = new QueryClient();

     if (isAuthenticated) {
         return (
             <QueryClientProvider client={queryClient}>
                 <div className="appOuterContainer">
                     <ModuleSideBar
                         onOptionSelectionChanged={onActiveModuleChange}>
                     </ModuleSideBar>
                     <ModuleLoader activeModule={activeModule}>
                         {initialisedModules}
                     </ModuleLoader>
                </div>
             </QueryClientProvider>);
     }

     return (
         <div className="appOuterContainer-login-spalsh">
             <LoginSplash onLoginSuccsess={onLoginComplete}/>
         </div>);
}
export default App;