import React, { useEffect, useState } from "react";
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import SideBarOption from "../entities/framework/sideBarOption";
import LoginSpash from "./authentication/login-spash/login-splash";
import AuthService from "../services/network/authentication/authService";
import LessonFeed from "../applets/lesson-feed/lesson-feed";
import RestService from "../services/network/RestService";

interface Props {
}

 const App: React.FunctionComponent<Props> = () => {
    const [activeModule, setActiveModule] = useState<string | JSX.Element>(<LessonFeed></LessonFeed>);

    const [isAuthenticated, setisAuthenticated] = useState<boolean>(AuthService.isLoggedIn());

    addEventListener("app-logout", handleLogout, true);

    // hacky but works - this is to request consent for a azure token. once consent has been granted the request is redirected back to the app via the api response (not ideal but works).
    useEffect(() => {
        RestService.Get("azure/consent/required").then(
            data => data.json().then(required => {
                if (required === true) {
                    RestService.Get("azure/consent").then(
                        data => data.text().then(
                            consentUrl => window.open(consentUrl)
                        )
                    )
                }
            }))},[]);

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

    return buildApp();
}

export default App;