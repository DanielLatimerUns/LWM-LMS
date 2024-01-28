import React from "react";
import RestService from "../../services/network/RestService";
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";
import Schedule from "../../entities/domainModels/schedule";
import ScheduleWizard from "./applets/schedule-wizard/schedule-wizard";

export interface Props {
    
}
 
export interface State {
    schedules: Schedule []
    selectedSchedule?: Schedule,
    activeActionApplet: JSX.Element | undefined,
    error?: string,
    hasError: boolean
}
 
export default class ScheduleManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);           
        this.state = {
            schedules: [], 
            selectedSchedule: undefined, 
            activeActionApplet: undefined,
            hasError: false,
            error: undefined
        }
    }

    componentDidMount() {
        this.getSchedules();
    }

    render() { 
        return ( 
            <Module 
                gridConfig={this.buildGridConfig()}
                moduleName="Schedule Center"
                moduleEntityName="Schedule"
                handleCloseClicked={this.handleAppletCancel.bind(this)}
                handleSaveCloseClicked={this.handleAppletSave.bind(this)}
                options={this.buildActionOptions()}
                error={this.state.error}
                hasError={this.state.hasError}>
                {this.state.activeActionApplet}
            </Module>
        );
    }

    private buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Day", name: "schedualedDayOfWeek"},
            {lable: "Start Time", name: "schedualedStartTime"},
            {lable: "End Time", name: "schedualedEndTime"}
        ];

        const rows: GridRow[] = 
        this.state.schedules.map(schedule => ({columnData: schedule, id: schedule.id}));
        
        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: this.handleEditSchedule.bind(this),
                handleDeleteClicked: this.handleDeleteSchedule.bind(this),
            };

        return gridConfig;
    }

    private buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet === undefined} 
                    onClick={() => this.setState({activeActionApplet: undefined, selectedSchedule: undefined})} 
                    name="Schedule Center">
                </LwmButton>
            ),
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet?.type === ScheduleWizard}  
                    onClick={this.handleAddNewSchedule.bind(this)} 
                    name={(this.state.selectedSchedule === undefined || 
                        this.state.selectedSchedule?.id === 0) ? "Schedule Creation" : 
                        "Edit Schedule: " + this.state.selectedSchedule?.schedualedStartTime}>    
                </LwmButton>
            )
        ];

        return options;
    }

    private getSchedules() {        
        RestService.Get('lessonschedule').then(
            resoponse => resoponse.json().then(
                (data: Schedule[]) => this.setState(
                    {schedules: data})
            ).catch(error => console.error(error))
        );
    }

    private handleAddNewSchedule() {
        const schedule: Schedule = {
            id: 0,
            schedualedStartTime: "",
            schedualedEndTime: "",
            schedualedDayOfWeek: 0,
            groupId: 0
        };

        this.setState({selectedSchedule: schedule})

        const applet = 
                <ScheduleWizard
                    hasError={this.state.hasError}
                    error={this.state.error}
                    schedule={schedule}>
                </ScheduleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleEditSchedule(schedule: Schedule) {
        this.setState({selectedSchedule: schedule});

        const applet = 
                <ScheduleWizard 
                    hasError={this.state.hasError}
                    error={this.state.error}
                    schedule={schedule}>
                </ScheduleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleDeleteSchedule(schedule: Schedule) {
        RestService.Delete(`lessonschedule/${schedule.id}`).then(() => this.getSchedules());
    }

    private handleLessonChange() {
        this.getSchedules();
        this.setState({error: undefined, hasError: false})
        this.setState({activeActionApplet: undefined, selectedSchedule: undefined});
    }

    private handleAppletCancel() {
        this.setState({error: undefined, hasError: false})
        this.setState({activeActionApplet: undefined, selectedSchedule: undefined});
    }

    private handleAppletSave() {
        if (this.state.selectedSchedule?.id === 0) {
            RestService.Post('lessonschedule', this.state.selectedSchedule).then(data =>
                {
                    if (data.ok) {
                        data.json().then(this.handleLessonChange.bind(this))
                    } else {
                        data.text().then(this.addError.bind(this));
                    }
                },
                error => this.setState({error: error.message, hasError: true})
            )
            return;
        }

        RestService.Put('lessonschedule', this.state.selectedSchedule).then(
            this.handleLessonChange.bind(this),
            error => this.setState({error: error.message, hasError: true}))
    }

    private addError(error: string) {
        this.setState({error: error, hasError: true});
    }
}
