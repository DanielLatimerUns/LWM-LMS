import React from "react";
import Lesson from "../types/Lesson";
import RestService from "../../../services/network/RestService";
import './lesson-manager.css';
import LessonWizard from "../applets/lesson-wizard/applet/lesson-wizard";
import LwmButton from "../../../framework/components/button/lwm-button";
import LessonManagerGrid from "../applets/lesson-manager-grid/applet/lesson-manager-grid";
import GridColumns from "../../types/gridColumns";
import GridRow from "../../types/gridRow";

export interface Props {
    moduleName: string
    moduleEntityName: string
    gridConfig: {
        columns: GridColumns[],
        rows: GridRow[],
        handleEditClicked: Function,
        handleDeleteClicked: Function,


    }
    options: JSX.Element[];
}
 
export interface State {
    activeActionApplet: JSX.Element | undefined
}
 
export default class LessonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
            
        this.state = {
            activeActionApplet: undefined
        }
    }

    render() { 
        return ( 
            <div className="moduleContainer">
                <div className="moduleActionSectionContainer">
                    {this.renderOptionsSection()}
                    {this.renderGrid()}
                    <div className="moduleActionSectionApplet">
                        {this.state.activeActionApplet}
                    </div>
                </div>
            </div>);
    }

    private renderOptionsSection() {
        return(
            <div className="moduleActionSectionOptionContainer">
                <div>
                    {this.props.options}
                </div>
                {this.renderSaveClose()}
            </div>
        );
    }

    private renderGrid() {
        if ( this.state.activeActionApplet !== undefined)
            return;

        if (this.props?.gridConfig.columns === undefined)
            return;

        const columns: GridColumns[] = [];

        columns.push({lable: "Lesson Name", name: "name"});
        columns.push({lable: "Lesson No", name: "lessonNo"});

        return (
        <div className="lessonManagerGridContainer">
            <Grid
                editClicked={this.props.handleEditLesson}
                deletClicked={this.props.handleDeleteLesson}
                columns={this.props.gridConfig.columns} 
                rows={this.props.lessons.map(lesson => ({columnData: lesson, id: lesson.id}))}>
            </Grid>
        </div>);
    }

    private renderSaveClose() {
        if (this.state.activeActionApplet?.type === LessonManagerGrid || this.state.activeActionApplet === undefined)
            return;

        return <div>
                <LwmButton name="Save & Close" onClick={this.handleAppletSave.bind(this)} isSelected={false}></LwmButton>
                <LwmButton name="Cancel & Close" onClick={this.handleAppletCancel.bind(this)} isSelected={false}></LwmButton>
              </div>;
    }

    
}
