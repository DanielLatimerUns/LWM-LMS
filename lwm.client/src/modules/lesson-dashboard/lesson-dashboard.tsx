import React, { Fragment } from "react";
import { DashboardModel } from "../../entities/app/dashboardModel";
import Grid, { GridColumn } from "../../framework/components/grid/grid";

import './lesson-dashboard.css';

interface LessonDashboardProps {
    dashboardModel: DashboardModel
}

const LessonDashboard: React.FunctionComponent<LessonDashboardProps> = (props) => {

    function buildHeader() {
        return (
            <Fragment>
                <div>
                    {props.dashboardModel.lessonSchedule?.schedualedStartTime} - {props.dashboardModel.lessonSchedule?.schedualedEndTime}
                </div>
                <div>
                    {props.dashboardModel?.group?.name}
                </div>
                <div>
                    Lesson Number {props.dashboardModel.lesson?.lessonNo}  ({props.dashboardModel.lesson?.name})
                </div>
            </Fragment>
        )
    }

    function buildStudents() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Students"});

        return (
            <Grid
            isDataLoading={false}
            columns={columns}
            rows={props.dashboardModel.students.map(student => ({columnData: student, id: student.id}))}
            editClicked={undefined} deleteClicked={undefined}>
        </Grid>)
    }


    function buildDocuments() {
        const columns: GridColumn[] = [];
        columns.push({name: "name", lable: "Documents"});

        return (
            <Grid
             isDataLoading={false}
            columns={columns}
            rows={props.dashboardModel.documents.map(document => ({columnData: document, id: document.id}))}
            editClicked={undefined} deleteClicked={undefined}>
        </Grid>)
    }

    return (
        <div className={props.dashboardModel.lessonSchedule.schedualedStartTime < Date.now().toString() ? "lessonDashboard lessonDashboard-selected" : "lessonDashboard"}>
            <div className="lessonDashboardContainer">
                <div className="lessonDashboardHeader">
                    {buildHeader()}
                </div>
                <div className="lessonDashboardContent">
                    <div className="lessonDashboradStudents">
                        {buildStudents()}
                    </div>
                    <div className="lessonDashboardDocuments">
                        {buildDocuments()}
                    </div>
                </div>
            </div>
        </div>
        );
}

export default LessonDashboard;
