import React from "react";
import GridColumn from "../../../../../../entities/framework/gridColumn";
import Grid from "../../../../../../framework/components/grid/grid";
import LessonDocument from "../../../../../../entities/framework/LessonDocument";
import './lesson-wizard-documents.css'

interface Props {
    documents: LessonDocument[];
    onDeleteClicked: Function;
}

const LessonWizardDocuments: React.FunctionComponent<Props> = (props) => {
    function renderDocumentGrid() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Name"});

        return (
        <Grid
            columns={columns}
            rows={props.documents.map(doc => ({columnData: doc, id: doc.id}))}
            editClicked={(doc: LessonDocument) => window.open(doc.path)}
            deletClicked={(doc: LessonDocument) => props.onDeleteClicked(doc)}>
        </Grid>)
    }

    return (
        <div className="lessonWizardFormDocuments">
        {renderDocumentGrid()}
    </div>);
}

export default LessonWizardDocuments;