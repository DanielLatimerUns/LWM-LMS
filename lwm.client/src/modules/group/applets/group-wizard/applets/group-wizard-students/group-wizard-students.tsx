import React from "react";
import Grid, { GridColumn} from "../../../../../../framework/components/grid/grid";
import './group-wizard-students.css'
import {Student} from "../../../../../../entities/domainModels/student";

interface Props {
    students: Student[];
}

 const GroupWizardStudents: React.FunctionComponent<Props> = (props) => {
    function renderGrid() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Name"});

        return (
            <Grid
            isDataLoading={false}
            columns={columns}
            rows={props.students.map(student => ({columnData: student, id: student.id}))}
            editClicked={() => {return;}}
            deleteClicked={() => {return;}}>
        </Grid>)
    }
    
    if (props.students.length === 0) {
        return "";
    }

    return (
        <div className="groupWizardFormStudents">
        <div>
            Assigned Students
        </div>
        {renderGrid()}
    </div>
     );
}

export default GroupWizardStudents;
