import React from "react";
import Lesson from "../../entities/domainModels/Lesson";
import RestService from "../../services/network/RestService";
import './lesson-manager.css';
import LessonWizard from "./applets/lesson-wizard/lesson-wizard";
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';

export interface Props {   
}
 
export interface State {
    lessons: Lesson[]
    selectedLesson?: Lesson,
    activeActionApplet?: JSX.Element,
    hasError: boolean,
    error?: string
}
 
export default class LessonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lessons: [], 
            selectedLesson: undefined, 
            activeActionApplet: undefined,
            hasError: false,
            error: 'All fields required'
        }
    }

    componentDidMount() {
        this.getLessons();
    }

    render() { 
        return (
            <Module 
                gridConfig={this.buildGridConfig()}
                moduleName="Lesson Center"
                moduleEntityName="Lesson"
                handleCloseClicked={this.handleAppletCancel.bind(this)}
                handleSaveCloseClicked={this.handleAppletSave.bind(this)}
                options={this.buildActionOptions()}
                hasError={this.state.hasError}
                error={this.state.error}>
                {this.state.activeActionApplet}
            </Module>);
    }

    private buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet === undefined} 
                    onClick={() => this.setState({activeActionApplet: undefined, selectedLesson: undefined})} 
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet?.type === LessonWizard}  
                    onClick={this.handleAddClicked.bind(this)} 
                    name={(this.state.selectedLesson === undefined || 
                        this.state.selectedLesson?.id === 0) ? "Add" : 
                        "Edit: " + this.state.selectedLesson?.name}
                    icon={newIcon}>    
                </LwmButton>
            )
        ];

        return options;
    }

    private buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Lesson Name", name: "name"},
            {lable: "Lesson No", name: "lessonNo"}
        ];

        const rows: GridRow[] = 
        this.state.lessons.map(lesson => ({columnData: lesson, id: lesson.id}));


        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: this.handleEditClicked.bind(this),
                handleDeleteClicked: this.handleDeleteClicked.bind(this),
            };

        return gridConfig;
    }

    private buildWizard(lesson: Lesson) {
        return(
        <LessonWizard 
            onValidationChanged={this.handleValidationChanged.bind(this)}
            lesson={lesson}>
        </LessonWizard>);
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
        this.setState({selectedLesson: lesson, activeActionApplet: this.buildWizard(lesson)});
    }

    private handleEditClicked(lesson: Lesson) {
        this.setState({selectedLesson: lesson ,activeActionApplet: this.buildWizard(lesson) });
    }

    private handleDeleteClicked(lesson: Lesson) {
        RestService.Delete(`lesson/${lesson.id}`).then(() => this.getLessons());
    }

    private handleAppletCancel() {
        this.setState({activeActionApplet: undefined, selectedLesson: undefined, hasError: false});
        this.setState({hasError: false});
    }

    private handleAppletSave() {
        if (this.state.hasError) {
            this.setState({hasError: true, error: "Required fields not set"});
            return;
        }

        if (this.state.selectedLesson?.id === 0) {
            RestService.Post('lesson', this.state.selectedLesson).then(() => this.getLessons());
            return;
        }

        RestService.Put('lesson',this.state.selectedLesson).then(() => this.getLessons());
    }

    private handleValidationChanged(isValid: boolean) {
        this.setState({hasError: !isValid});
    }
}
