import React from "react";
import ModuleSideBar from "../framework/components/moduleSideBar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import SideBarOption from "../entities/framework/sideBarOption";
import LessonManager from "../applets/lesson/lesson-manager";
import LoginSpash from "./authentication/login-spash/login-splash";
import LoginModel from "../entities/app/loginModel";
import AuthService from "../services/network/authentication/authService";

interface Props {
    
}
 
interface State {
    activeModule: string | JSX.Element;
    isAuthenticated: boolean;
}
 
export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { activeModule: <LessonManager></LessonManager>, isAuthenticated: false}

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
        this.setState({isAuthenticated: false});
    }
}
 