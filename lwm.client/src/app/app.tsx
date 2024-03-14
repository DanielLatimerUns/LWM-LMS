import React, { useEffect, useState } from "react";
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import SideBarOption from "../entities/framework/sideBarOption";
import LoginSpash from "./authentication/login-spash/login-splash";
import AuthService from "../services/network/authentication/authService";
import LessonFeed from "../applets/lesson-feed/lesson-feed";
import azureAuthService from "../services/network/azure/azureAuthService";

interface Props {
}

 const App: React.FunctionComponent<Props> = () => {
    const [activeModule, setActiveModule] = useState<string | JSX.Element>(<LessonFeed></LessonFeed>);

    const [isAuthenticated, setisAuthenticated] = useState<boolean>(AuthService.isLoggedIn());

    addEventListener("app-logout", handleLogout, true);

    useEffect(() => {
        authoriseAzureCredentials();
    },[isAuthenticated]);

    function buildApp() {
        if(isAuthenticated) {
            return (
            <div className="appOuterContainer">
                <ModuleSideBar
                    onOptionSelectionChanged={onModuleSecetionChanged}
                    userName="Kristina Unsworth">
                </ModuleSideBar>
                <ModuleLoader>
                    {activeModule}
                </ModuleLoader>
            </div>);
        }

        return (
            <div className="appOuterContainer-login-spalsh">
                <LoginSpash onLoginSuccsess={onLoginComplete}></LoginSpash>
            </div>);
    }

    function onModuleSecetionChanged (option: SideBarOption) {
        setActiveModule(option.module);
    }

    function onLoginComplete() {
        setisAuthenticated(true);
    }

    function handleLogout() {
        AuthService.Logout();
        setisAuthenticated(false);
    }

    function authoriseAzureCredentials() {
        if (!isAuthenticated) { return; }

        if (azureAuthService.getCachedAuthToken()) {
            return;
        }

        azureAuthService.redirectToAzureUserAuth();
    }

    return buildApp();
}

export default App;