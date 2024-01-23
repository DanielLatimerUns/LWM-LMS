import React from "react";
import ModuleSideBar from "../framework/components/moduleSideBar/module-side-bar";
import ModuleLoader from "../framework/components/modulePanel/module-loader";
import './app.css';
import SideBarOption from "../entities/framework/sideBarOption";
import LessonManager from "../applets/lesson/lesson-manager";

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
                <ModuleSideBar 
                    onOptionSelectionChanged={this.onModuleSecetionChanged.bind(this)} 
                    userName="Kristina Unsworth">
                </ModuleSideBar>
                <ModuleLoader>
                    {this.state.activeModule}
                </ModuleLoader>
        </div>);
    }

    onModuleSecetionChanged = (option: SideBarOption) => {
        this.setState({activeModule: option.module})
    }
}
 