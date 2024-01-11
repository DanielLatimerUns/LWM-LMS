import React, { useState } from "react";
import Lesson from "../types/Lesson";

export interface Props {
    
}
 
export interface State {
    lessons: Lesson[]
    selectedLesson?: Lesson  
}
 
export default class LessonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() { 
        return ( 
        <div>
            {this.renderActionsSection()}
            {this.renderGrid()}
        </div>);
    }

    async componentDidMount() {
        await this.getLessons();
    }

    private renderGrid() {
        return(
        <div className="gridOuterContainer">
            <div className="gridHeader">
                <div className="gridHeaderColumn">
                    <h2>
                        Name
                    </h2>
                </div>
                <div className="gridHeaderColumn">
                    <h2>
                        Lesson Number
                    </h2>
                </div>
            </div>
            <div className="gridContent">
            {this.state.lessons.map(lesson => 
                <div className="gridContentRow">
                    <div className="gridContentColumn">
                        <p>{lesson.name}</p>
                    </div>
                    <div className="gridContentColumn">
                        <p>{lesson.lessonNo}</p>
                    </div>
                </div>)}
            </div>
        </div>);
    }

    private renderActionsSection() {
        return(<div></div>);
    }

    private async getLessons() {        
        await fetch('lesson').then(
            resoponse => resoponse.json().then(
                (data: Lesson[]) => this.setState(
                    {lessons: data})
            )
        );
    }
}
