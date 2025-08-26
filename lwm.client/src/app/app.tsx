import React, { useState } from "react";
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import { SideBarOption } from "../entities/framework/sideBarOption";
import AuthService from "../services/network/authentication/authService";
import LessonFeed from "../applets/lesson-feed/lesson-feed";
import LoginSplash from "./authentication/login-spash/login-splash";

interface Props {}

 const App: React.FunctionComponent<Props> = () => {
    const [activeModule, setActiveModule] = useState<string | JSX.Element>(<LessonFeed></LessonFeed>);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isLoggedIn());

    addEventListener("app-logout", handleLogout, true);
    
    function onActiveModuleChange (option: SideBarOption) {
        setActiveModule(option.module);
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
                 <ModuleLoader>
                     {activeModule}
                 </ModuleLoader>
             </div>);
     }

     return (
         <div className="appOuterContainer-login-spalsh">
             <LoginSplash onLoginSuccsess={onLoginComplete}/>
         </div>);
}

export default App;