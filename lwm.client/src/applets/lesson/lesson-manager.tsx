import React from "react";
import Lesson from "../../entities/domainModels/Lesson";
import RestService from "../../services/network/RestService";
import './lesson-manager.css';
import LessonWizard from "./applets/lesson-wizard/lesson-wizard";
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";

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
            activeActionApplet: undefined
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
                >
                {this.state.activeActionApplet}
            </Module>);
    }

    private buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet === undefined} 
                    onClick={() => this.setState({activeActionApplet: undefined, selectedLesson: undefined})} 
                    name="Lesson Center">
                </LwmButton>
            ),
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet?.type === LessonWizard}  
                    onClick={this.handleAddClicked.bind(this)} 
                    name={(this.state.selectedLesson === undefined || 
                        this.state.selectedLesson?.id === 0) ? "Lesson Creation" : 
                        "Edit Lesson: " + this.state.selectedLesson?.name}>    
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
