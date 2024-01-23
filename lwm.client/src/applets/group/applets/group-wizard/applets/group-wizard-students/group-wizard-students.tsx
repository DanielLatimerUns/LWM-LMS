import React from "react";
import GridColumn from "../../../../../../entities/framework/gridColumn";
import Grid from "../../../../../../framework/components/grid/grid";
import './group-wizard-students.css'
import Student from "../../../../../../entities/domainModels/student";

interface Props {
    students: Student[];
}
 
interface State {
}
 
export default class GroupWizardStudents extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="groupWizardFormStudents">
            <div>
                Assigned Students
            </div>                   
            {this.renderGrid()}
        </div>
         );
    }

    private renderGrid() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Name"});
        
        return (
        <Grid 
            columns={columns} 
            rows={this.props.students.map(student => ({columnData: student, id: student.id}))}
            editClicked={() => {return;}}
            deletClicked={() => {return;}}>
        </Grid>)
    }
}
