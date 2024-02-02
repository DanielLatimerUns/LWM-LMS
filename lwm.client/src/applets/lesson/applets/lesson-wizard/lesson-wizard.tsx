import React, { Fragment } from "react";
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
}
 
export interface State {
    lessonState: Lesson;
    documents: LessonDocument[];
}
 
export default class LessonWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {lessonState: this.props.lesson, documents: []}
    }

    componentDidMount() {
        this.getDocuments(this.props.lesson.id);
    }

    render() { 
        return ( 
        <div className="lessonWizardContainer">
            <div className="lessonWizardBody">
                {this.buildForm()}
                {this.renderDoocuments()} 
            </div>
        </div>);
    }

    private renderDoocuments() {
        if(this.props.lesson.id === 0)
            return;

        return <LessonWizardDocuments documents={this.state.documents}/>;
    }

    private getDocuments(lessonId: number) {
        RestService.Get(`document/${lessonId}`).then( response =>
            response.json().then(data => this.setState({documents: data}))
        ).catch(error => console.error(error));
    }

    private buildForm() {
        const fields: FormField[] = [
            {
                label: "Name" ,
                type: "text",
                id: "name" ,
                value: this.props.lesson.name,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                required: true,
                validationPattern: undefined,
                selectOptions: undefined
            },
            {
                label: "Lesson Number" ,
                type: "text",
                id: "lessonNo" ,
                value: this.props.lesson.lessonNo,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                required: true,
                validationPattern: "[0-9]+",
                selectOptions: undefined
            }
        ];

        return (
            <Fragment>
                <div className="fieldSetHeader">Lesson Record</div>
                <Form onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)} fields={fields}/>
            </Fragment>)
    }

    private handleFormChange(e: any) {
        const changedLesson: Lesson = Object.assign(this.state.lessonState);
        const targetField: any = e.target.value;

        for (const field in changedLesson) {
            if (field === e.target.id) {
                (changedLesson as any)[field] = targetField;
            }
        }

        this.setState({lessonState: changedLesson})
    }

    private handleFieldValidationChanged(isValid: boolean) {
        if (this.props.onValidationChanged) {
            this.props.onValidationChanged(isValid);
        }
    }
}
