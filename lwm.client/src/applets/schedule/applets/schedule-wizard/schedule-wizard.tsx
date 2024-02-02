import React, { Fragment } from "react";
import './schedule-wizard.css';
import Group from "../../../../entities/domainModels/group";
import RestService from "../../../../services/network/RestService";
import Schedule from "../../../../entities/domainModels/schedule";
import FormField from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";

export interface Props {
    schedule: Schedule;
    onValidationChanged?: Function;
}
 
export interface State {
    schedule: Schedule;
    groups: Group[];
}
 
export default class ScheduleWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {schedule: this.props.schedule, groups: []}
    }

    componentDidMount(): void {
        this.getGroups();
    }

    render() { 
        return ( 
        <div className="scheduleWizardContainer">
            <div className="scheduleWizardBody">
                {this.renderForms()}
            </div>
        </div>);
    }

    private renderForms() {
        const groups: JSX.Element[] = [
            <option value={undefined}>Select a Group</option>
        ];

        const daysOfWeek: JSX.Element[] = [
            <option value={undefined}>Select a Day</option>,
            <option value={1}>Monday</option>,
            <option value={2}>Tuesday</option>,
            <option value={3}>Wednesday</option>,
            <option value={4}>Thursday</option>,
            <option value={5}>Friday</option>,
            <option value={6}>Saterday</option>,
            <option value={7}>Sunday</option>
        ];

        this.state.groups.map(group => groups.push(
        <option value={group.id}>{group.name}</option>))


        const fields: FormField[] = [
            {
                label: "Day Of Week",
                id: "schedualedDayOfWeek",
                value: this.props.schedule.schedualedDayOfWeek,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek
            },

            {
                label: "Start Time" ,
                id: "schedualedStartTime",
                value: this.props.schedule.schedualedStartTime,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "End Time" ,
                id: "schedualedEndTime",
                value: this.props.schedule.schedualedEndTime,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "Group",
                id: "groupId",
                value: this.props.schedule.groupId,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: groups
            },
        ];

        return(           
        <Fragment>
            <div className="fieldSetHeader">Schedule Record</div>
            <Form onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)} fields={fields}/>
        </Fragment>)
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
        
        this.setState({schedule: changedSchedule})
    }

    private handleFieldValidationChanged(isValid: boolean) {
        if (this.props.onValidationChanged) {
            this.props.onValidationChanged(isValid);
        }
    }
}
