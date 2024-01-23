import React from "react";
import Lesson from "../../../../../../entities/domainModels/Lesson";
import Form from "../../../../../../framework/components/form/form";

interface Props {
    lesson: Lesson;
    handleFormChange: Function
}
 
interface State {
}
 
export default class LessonWizardForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="lessonWizardFormContainer">
                <Form>
                    <input 
                        key="Name" 
                        type="text"
                        id="name" 
                        value={this.props.lesson.name}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <input 
                        key="Lesson No" 
                        type="text" 
                        id="lessonNo"
                        readOnly= {false}
                        value={this.props.lesson.lessonNo}
                        onChange={this.props.handleFormChange.bind(this)}/>
                </Form>
            </div>
        );
    }
}
