import React from 'react'
import './module-loader.css'
import {SideBarOption} from "../../../entities/framework/sideBarOption.ts";

interface Props {
    children: JSX.Element[];
    activeModule: SideBarOption
}
 
interface State {
    
}
 
export default class ModuleLoader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { };
    }
    
    buildModuleList() {
        const elements: JSX.Element[] = [];
        
        for (const element of this.props.children) {
            elements.push(
                <div className={element === this.props.activeModule.module ? "moduleLoaderModule-active    " : "moduleLoaderModule"}>
                    <div className="moduleLoaderHeader">
                        <img src={this.props.activeModule.icon}/>
                        <h2>{this.props.activeModule.name}</h2>
                    </div>
                    {element}
                </div>
            );
        }
        
        return elements;
    }

    render() { 
        return ( 
            <div className="moduleLoaderContainer">
                {this.buildModuleList()}
            </div>
         );
    }
}
