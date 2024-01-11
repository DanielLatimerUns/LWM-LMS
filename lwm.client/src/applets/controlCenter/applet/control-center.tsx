import { useEffect, useState } from 'react';
import ControlOption from '../types/option';
import './control-center.css'
import React from 'react';

interface IProps {
}

interface IState {
  options: ControlOption[];
}

export default class ControlCenter extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        const options: ControlOption[] = [];

        options.push({
            name: 'Test Applet',
            applet: 'test'
        });

        options.push({
            name: 'Lessons',
            applet: 'lessons'
        });

        this.state = {options: options};  
        this.handleControlOptionClick = this.handleControlOptionClick.bind(this);
    }
    
    render() {
        return (
            <div className="container">
                <div className='optionContainer'>
                    {this.buildOptions()}
                </div>
            </div>
        )
    }
    
    private handleControlOptionClick(option: ControlOption) {

    }
 
    private buildOptions() {
        return this.state.options.map(option => 
            <div className='option'>
                <button onClick={() =>this.handleControlOptionClick(option)}>
                    {option.name}
                </button>
            </div>
        );;
    }
}
