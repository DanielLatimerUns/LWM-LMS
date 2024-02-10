import React, { Fragment, useEffect, useState } from "react";
import './lesson-wizard.css';
import Lesson from "../../../../entities/domainModels/Lesson";
import RestService from "../../../../services/network/RestService";
import LessonDocument from "../../../../entities/framework/LessonDocument";
import LessonWizardDocuments from "./applets/lesson-wizard-documents/lesson-wizard-documents";
import FormField from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";

export interface Props {
    lesson: Lesson;
    onValidationChanged?: Function;
    onChange: Function;
};

const LessonWizard: React.FunctionComponent<Props> = (props) => {
    const [documents, setDocuments] = useState<LessonDocument[]>([]);

    const [formFields] = useState<FormField[]>([
        {
            label: "Name" ,
            type: "text",
            id: "name" ,
            value: props.lesson.name,
            onFieldChangedSuccsess: handleFormChange,
            required: false,
            validationPattern: undefined,
            selectOptions: undefined
        },
        {
            label: "Lesson Number" ,
            type: "text",
            id: "lessonNo" ,
            value: props.lesson.lessonNo,
            onFieldChangedSuccsess: handleFormChange,
            required: true,
            validationPattern: "[0-9]+",
            selectOptions: undefined
        }
    ]);

    useEffect(() => {
        getDocuments(props.lesson.id);
    }, []);

    function renderDoocuments() {
        if(props.lesson.id === 0)
            return;

        return <LessonWizardDocuments documents={documents}/>;
    }

    function getDocuments(lessonId: number) {
        RestService.Get(`document/${lessonId}`).then( response =>
            response.json().then(data => setDocuments(data))
        ).catch(error => console.error(error));
    }

    function buildForm() {

        return (
            <Fragment>
                <div className="fieldSetHeader">Lesson Record</div>
                <Form onFieldValidationChanged={handleFieldValidationChanged} fields={formFields}/>
            </Fragment>)
    }

    function handleFormChange(e: any) {
        const changedLesson: Lesson = Object.assign({}, props.lesson);
        const targetField: any = e.target.value;

        for (const field in changedLesson) {
            if (field === e.target.id) {
                (changedLesson as any)[field] = targetField;
            }
        }
        props.onChange(changedLesson);
    }

    function handleFieldValidationChanged(isValid: boolean) {
        if (props.onValidationChanged) {
            props.onValidationChanged(isValid);
        }
    }

    return (
        <div className="lessonWizardContainer">
            <div className="lessonWizardBody">
                {buildForm()}
                {renderDoocuments()}
            </div>
        </div>);
}

export default LessonWizard;