import React from "react";
import './lesson-manager-grid.css'
import GridColumns from "../../../../../framework/types/gridColumns";
import GridRow from "../../../../../framework/types/gridRow";
import Grid from "../../../../../framework/components/grid/grid";
import Lesson from "../../../types/Lesson";

interface Props {
    handleEditLesson: Function,
    handleDeleteLesson: Function
    lessons: Lesson[];
}
 
interface State {
    lessons: Lesson[];
}
 
export default class LessonManagerGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    
    render() { 
        if (this.props?.lessons === undefined)
            return;

        const columns: GridColumns[] = [];

        columns.push({lable: "Lesson Name", name: "name"});
        columns.push({lable: "Lesson No", name: "lessonNo"});

        return (
        <div className="lessonManagerGridContainer">
            <Grid
                editClicked={this.props.handleEditLesson}
                deletClicked={this.props.handleDeleteLesson}
                columns={columns} 
                rows={this.props.lessons.map(lesson => ({columnData: lesson, id: lesson.id}))}>
            </Grid>
        </div>);
    }
}
