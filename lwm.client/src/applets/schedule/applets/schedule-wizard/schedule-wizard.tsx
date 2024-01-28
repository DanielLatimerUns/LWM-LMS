import React from "react";
import './schedule-wizard.css';
import Group from "../../../../entities/domainModels/group";
import RestService from "../../../../services/network/RestService";
import ScheduleWizardForm from "./applets/schedule-wizard-form/schedule-wizard-form";
import Schedule from "../../../../entities/domainModels/schedule";

export interface Props {
    schedule: Schedule;
    error?: string;
    hasError: boolean;
}
 
export interface State {
    schedule: Schedule;
    groups: Group[];
    error?: string;
    hasError: boolean;
}
 
export default class ScheduleWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {schedule: this.props.schedule, groups: [], error: this.props.error, hasError: this.props.hasError}
    }

    componentDidMount(): void {
        this.getGroups();
    }

    render() { 
        return ( 
        <div className="scheduleWizardContainer">
            <div className="scheduleWizardBody">
                <ScheduleWizardForm 
                schedule={this.state.schedule}
                groups={this.state.groups}
                handleFormChange={this.handleFormChange.bind(this)}/>
            </div>
        </div>);
    }

    private getGroups() {
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => this.setState(
                    {groups: data})
            ).catch( error => console.error(error))
        );
    }

    private handleFormChange(e: any) {
        const changedSchedule = this.state.schedule;
        const targetField: string = e.target.value;

        for (const field in changedSchedule) {
            if (field === e.target.id) {
                (changedSchedule as any)[field] = targetField;
            }
        }

        if (e.target === null) return;
        this.setState({schedule: changedSchedule})
    }
}
