import React from "react";
import ModuleSideBar from "../applets/module-side-bar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import SideBarOption from "../entities/framework/sideBarOption";
import LoginSpash from "./authentication/login-spash/login-splash";
import AuthService from "../services/network/authentication/authService";
import LessonFeed from "../applets/lesson-feed/lesson-feed";

interface Props {
    
}
 
interface State {
    activeModule: string | JSX.Element;
    isAuthenticated: boolean;
}
 
export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { activeModule: <LessonFeed></LessonFeed>, isAuthenticated: false}

        addEventListener("app-logout", this.handleLogout.bind(this), true);
    }
    
    render() { 
        return this.buildApp();
    }

    componentDidMount(): void {
        this.setState({isAuthenticated: AuthService.isLoggedIn()});
    }

    private buildApp() {
        if(this.state.isAuthenticated) {
            return (        
            <div className="appOuterContainer">    
                <ModuleSideBar 
                    onOptionSelectionChanged={this.onModuleSecetionChanged.bind(this)} 
                    userName="Kristina Unsworth">
                </ModuleSideBar>
                <ModuleLoader>
                    {this.state.activeModule}
                </ModuleLoader>
            </div>);
        }

        return (
            <div className="appOuterContainer-login-spalsh">
                <LoginSpash onLoginSuccsess={this.onLoginComplete.bind(this)}></LoginSpash>
            </div>)
    }

    private onModuleSecetionChanged = (option: SideBarOption) => {
        this.setState({activeModule: option.module})
    }

    private onLoginComplete() {
        this.setState({isAuthenticated: true});
    }

    private handleLogout() {
        AuthService.Logout();
        this.setState({isAuthenticated: false});
    }
}
 