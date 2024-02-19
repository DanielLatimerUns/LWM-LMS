import React from "react";
import GridColumn from "../../../../../../entities/framework/gridColumn";
import Grid from "../../../../../../framework/components/grid/grid";
import LessonDocument from "../../../../../../entities/framework/LessonDocument";
import './lesson-wizard-documents.css'

interface Props {
    documents: LessonDocument[];
}

const LessonWizardDocuments: React.FunctionComponent<Props> = (props) => {
    function renderDocumentGrid() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Document Name"});
        columns.push({name: "path", lable: "Document Path"});

        return (
        <Grid
            columns={columns}
            rows={props.documents.map(doc => ({columnData: doc, id: doc.id}))}
            editClicked={(doc: LessonDocument) => window.open(doc.path)}
            deletClicked={() => {return;}}>
        </Grid>)
    }

    return (
        <div className="lessonWizardFormDocuments">
        <div>
            Lesson Documents
        </div>
        {renderDocumentGrid()}
    </div>);
}

export default LessonWizardDocuments;