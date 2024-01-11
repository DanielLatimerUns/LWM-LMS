import React from "react";
import ModuleSideBar from "../moduleSideBar/module-side-bar";
import ModuleLoader from "../modulePanel/module-loader";
import './app.css';

interface Props {
    
}
 
interface State {
    
}
 
export default class App extends React.Component<Props, State> {
    state = {  }
    render() { 
        return ( 
        <div className="appOuterContainer">
            <div className="sideBarContainer">
                <ModuleSideBar userName="Kristina Unsworth"></ModuleSideBar>
            </div>
            <div className="moduleLoaderContainer">
                <ModuleLoader appletToRender="control_center"></ModuleLoader>
            </div>
        </div>);
    }
}
 