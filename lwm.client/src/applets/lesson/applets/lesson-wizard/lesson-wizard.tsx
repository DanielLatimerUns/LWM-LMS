import React from "react";
import './lesson-wizard.css';
import Lesson from "../../../../entities/domainModels/Lesson";
import RestService from "../../../../services/network/RestService";
import LessonDocument from "../../../../entities/framework/LessonDocument";
import LessonWizardDocuments from "./applets/lesson-wizard-documents/lesson-wizard-documents";
import LessonWizardForm from "./applets/lesson-wizard-form/lesson-wizard-form";

export interface Props {
    lesson: Lesson;
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
                <LessonWizardForm lesson={this.state.lessonState} handleFormChange={this.handleFormChange.bind(this)}/>
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

    private handleFormChange(e: any) {
        const changedLesson: Lesson = Object.assign(this.state.lessonState);
        const targetField: string = e.target.value;

        for (const field in changedLesson) {
            if (field === e.target.id) {
                (changedLesson as any)[field] = targetField;
            }
        }

        if (e.target === null) return;

        this.setState({lessonState: changedLesson})
    }
}
