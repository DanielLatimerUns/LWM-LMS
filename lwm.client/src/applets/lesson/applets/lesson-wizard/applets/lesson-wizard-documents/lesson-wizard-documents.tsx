import React from "react";
import GridColumns from "../../../../../../framework/types/gridColumns";
import Grid from "../../../../../../framework/components/grid/grid";
import LessonDocument from "../../../../types/LessonDocument";
import './lesson-wizard-documents.css'

interface Props {
    documents: LessonDocument[];
}
 
interface State {
}
 
export default class LessonWizardDocuments extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="lessonWizardFormDocuments">
            <div>
                Lesson Documents
            </div>                   
            {this.renderDocumentGrid()}
        </div>
         );
    }

    private renderDocumentGrid() {
        const columns: GridColumns[] = [];
        columns.push({name: "name", lable: "Document Name"});
        columns.push({name: "path", lable: "Document Path"});
        
        return (
        <Grid 
            columns={columns} 
            rows={this.props.documents.map(doc => ({columnData: doc, id: doc.id}))}
            editClicked={() => {return;}}
            deletClicked={() => {return;}}>
        </Grid>)
    }
}
