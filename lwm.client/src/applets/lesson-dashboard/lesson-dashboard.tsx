import React, { Fragment } from "react";
import DashboardModel from "../../entities/app/dashboardModel";
import GridColumn from "../../entities/framework/gridColumn";
import Grid from "../../framework/components/grid/grid";
import RestService from "../../services/network/RestService";
import './lesson-dashboard.css';

interface LessonDashboardProps {
    dashboardModel: DashboardModel;
}
 
interface LessonDashboardState {
 
}
 
export default class LessonDashboard extends React.Component<LessonDashboardProps, LessonDashboardState> {
    constructor(props: LessonDashboardProps) {
        super(props);
    }

    componentDidMount(): void {
        this.geCurrentLessonData();
    }
    
    render() { 
        if (!this.props.dashboardModel?.lessonSchedule) { return (
            <div className="lessonDashboard">
            <div className="lessonDashboardContainer">
                No lessons Left for today!
            </div>
        </div> 
        ) }

        return (
            <div className={this.props.dashboardModel.lessonSchedule.schedualedStartTime < Date.now().toString() ? "lessonDashboard lessonDashboard-selected" : "lessonDashboard"}>
                <div className="lessonDashboardContainer">
                    <div className="lessonDashboardHeader">
                        {this.buildHeader()}
                    </div>
                    <div className="lessonDashboardContent">
                        <div className="lessonDashboradStudents">
                            {this.buildStudents()}
                        </div>
                        <div className="lessonDashboardDocuments">
                            {this.buildDocuments()}
                        </div>
                    </div>
                </div>
            </div> 
            );
    }

    private buildHeader() {
        return (
            <Fragment>
                <div>
                    {this.props.dashboardModel.lessonSchedule?.schedualedStartTime} - {this.props.dashboardModel.lessonSchedule?.schedualedEndTime}
                </div>
                <div>
                    {this.props.dashboardModel?.group?.name}
                </div>
                <div>
                    Lesson Number {this.props.dashboardModel.lesson?.lessonNo}  ({this.props.dashboardModel.lesson?.name})
                </div>
            </Fragment>
        )
    }

    private buildStudents() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Students"});
        
        return (
        <Grid 
            columns={columns} 
            rows={this.props.dashboardModel.students.map(student => ({columnData: student, id: student.id}))}
            editClicked={undefined} deletClicked={undefined}>
        </Grid>)
    }
    

    private buildDocuments() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Documents"});
        
        return (
        <Grid 
            columns={columns} 
            rows={this.props.dashboardModel.documents.map(document => ({columnData: document, id: document.id}))}
            editClicked={undefined} deletClicked={undefined}>
        </Grid>)
    }

    private geCurrentLessonData() {
        RestService.Get('lessonschedule/current').then(
            resoponse => resoponse.json().then(
                (data: DashboardModel) => this.setState(
                    {dashboardModel: data})
            ).catch( error => console.error(error))
        );
    }
}
 