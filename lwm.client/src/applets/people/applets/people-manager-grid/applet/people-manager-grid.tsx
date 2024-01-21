import React from "react";
import GridColumns from "../../../../../framework/types/gridColumns";
import GridRow from "../../../../../framework/types/gridRow";
import Grid from "../../../../../framework/components/grid/grid";
import { Person } from "../../../types/person";

interface Props {
    handleEditPerson: Function,
    handleDeletePerson: Function
    persons: Person[];
}
 
interface State {
}
 
export default class PeopleManagerGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    
    render() { 
        const columns: GridColumns[] = [];

        columns.push({lable: "Forename", name: "forname"});
        columns.push({lable: "Surename", name: "surename"});
        columns.push({lable: "Email", name: "emailAddress1"});
        columns.push({lable: "Phone", name: "phoneNo"});

        const rows: GridRow[] = this.props.persons.map(person => ({columnData: person, id: person.id}));

        return (
        <div className="lessonManagerGridContainer">
            <Grid
                editClicked={this.props.handleEditLesson}
                deletClicked={this.props.handleDeleteLesson}
                columns={columns} 
                rows={rows}>
            </Grid>
        </div>);
    }
}
