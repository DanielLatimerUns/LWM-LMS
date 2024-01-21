import React from "react";
import Lesson from "../types/Lesson";
import RestService from "../../../services/network/RestService";
import './lesson-manager.css';
import LessonWizard from "../applets/lesson-wizard/applet/lesson-wizard";
import LwmButton from "../../../framework/components/button/lwm-button";
import LessonManagerGrid from "../applets/lesson-manager-grid/applet/lesson-manager-grid";

export interface Props {
    
}
 
export interface State {
    lessons: Lesson[]
    selectedLesson?: Lesson,
    activeActionApplet?: JSX.Element 
}
 
export default class LessonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lessons: [], 
            selectedLesson: undefined, 
            activeActionApplet: <div></div>
        }
    }

    componentDidMount() {
        this.getLessons();
    }

    render() { 
        return ( 
            <div className="lessonManagerContainer">
                <div className="lessonManagerActionSectionContainer">
                    {this.renderActionOptionsSection()}
                    {this.renderGrid()}
                    <div className="lessonManagerActionSectionApplet">
                        {this.state.activeActionApplet}
                    </div>
                </div>
            </div>);
    }

    private renderActionOptionsSection() {
        return(
            <div className="lessonManagerActionSectionOptionContainer">
                <div>
                    <LwmButton 
                        isSelected={this.state.activeActionApplet === undefined} 
                        onClick={() => this.setState({activeActionApplet: undefined, selectedLesson: undefined})} 
                        name="Lesson Center">
                    </LwmButton>
                    <LwmButton 
                        isSelected={this.state.activeActionApplet?.type === LessonWizard}  
                        onClick={this.handleAddClicked.bind(this)} 
                        name={this.state.selectedLesson ? "Edit Lesson: " + this.state.selectedLesson.name : "Lesson Creation"}>    
                    </LwmButton>
                </div>
                {this.renderSaveClose()}
            </div>
        );
    }

    private renderGrid() {
        if ( this.state.activeActionApplet !== undefined)
            return;

        return <LessonManagerGrid 
        lessons={this.state?.lessons} 
        handleEditLesson={this.handleEditClicked.bind(this)} 
        handleDeleteLesson={this.handleDeleteClicked.bind(this)}/>;
    }

    private renderSaveClose() {
        if (this.state.activeActionApplet?.type === LessonManagerGrid || this.state.activeActionApplet === undefined)
            return;

        return <div>
                <LwmButton name="Save & Close" onClick={this.handleAppletSave.bind(this)} isSelected={false}></LwmButton>
                <LwmButton name="Cancel & Close" onClick={this.handleAppletCancel.bind(this)} isSelected={false}></LwmButton>
              </div>;
    }

    private getLessons() {        
        RestService.Get('lesson').then(
            resoponse => resoponse.json().then(
                (data: Lesson[]) =>
                    this.setState(
                    {
                        lessons: data,
                        selectedLesson: undefined,
                        activeActionApplet: undefined
                    })
            ).catch( error => console.error(error))
        );
    }

    private handleAddClicked() {
        const lesson: Lesson = {lessonNo: "", name: "", id: 0};

        this.setState({selectedLesson: lesson});
        const applet = <LessonWizard 
                    lesson={lesson}>
                </LessonWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleEditClicked(lesson: Lesson) {
        this.setState({selectedLesson: lesson});

        const applet = <LessonWizard 
                    lesson={lesson}>
                </LessonWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleDeleteClicked(lesson: Lesson) {
        RestService.Delete(`lesson/${lesson.id}`).then(() => this.getLessons());
    }

    private handleAppletCancel() {
        this.setState({activeActionApplet: undefined, selectedLesson: undefined});
    }

    private handleAppletSave() {
        this.setState({lessons: []});

        if (this.state.selectedLesson?.id === 0) {
            RestService.Post('lesson', this.state.selectedLesson).then(() => this.getLessons());
            return;
        }

        RestService.Put('lesson',this.state.selectedLesson).then(() => this.getLessons());
    }
}
