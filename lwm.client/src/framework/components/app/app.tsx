import React from "react";
import ModuleSideBar from "../moduleSideBar/module-side-bar";
import ModuleLoader from "../modulePanel/module-loader";
import './app.css';
import SideBarOption from "../../types/sideBarOption";
import LessonManager from "../../../applets/lesson/applet/lesson-manager";

interface Props {
    
}
 
interface State {
    activeModule: string | JSX.Element;
}
 
export default class App extends React.Component<Props, State> {
    state = { activeModule: <LessonManager></LessonManager> }
    render() { 
        return ( 
        <div className="appOuterContainer">
            <div className="sideBarContainer">
                <ModuleSideBar onOptionSelectionChanged={this.onModuleSecetionChanged.bind(this)} userName="Kristina Unsworth"></ModuleSideBar>
            </div>
            <div className="moduleLoaderContainer">
                <ModuleLoader>
                    {this.state.activeModule}
                </ModuleLoader>
            </div>
        </div>);
    }

    onModuleSecetionChanged = (option: SideBarOption) => {
        this.setState({activeModule: option.module})
    }
}
 