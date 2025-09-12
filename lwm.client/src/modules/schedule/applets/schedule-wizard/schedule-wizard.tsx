import React, {Fragment, JSX} from "react";
import './schedule-wizard.css';
import {Group} from "../../../../entities/domainModels/group";
import {Schedule} from "../../../../entities/domainModels/schedule";
import {FormField} from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";

export interface Props {
    schedule?: Schedule;
    onValidationChanged?: Function;
    groups: Group[];
    onChange: Function;
}

const ScheduleWizard: React.FunctionComponent<Props> = (props) => {

    function renderForms() {
        if (props.schedule === undefined) {
            return;
        }
        
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
            <option value={6}>Saturday</option>,
            <option value={7}>Sunday</option>
        ];

        props.groups.map(group => groups.push(
        <option value={group.id}>{group.name}</option>))

        const isReadOnly: boolean = (props.schedule?.timeTableEntryId ? props.schedule?.timeTableEntryId > 0 : false) 
            || props.schedule.isCancelled;

        const fields: FormField[] = [
            {
                label: "Title" ,
                id: "title",
                value: props.schedule.title,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: false,
                type: "text",
                selectOptions: undefined,
                isReadOnly: isReadOnly,
                isHidden: isReadOnly,
            },
            {
                label: "Day Of Week",
                id: "scheduledDayOfWeek",
                value: props.schedule.scheduledDayOfWeek,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek,
                isReadOnly: isReadOnly,
            },
            {
                label: "Start Time" ,
                id: "scheduledStartTime",
                value: props.schedule.scheduledStartTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined,
                isReadOnly: isReadOnly,
            },
            {
                label: "End Time" ,
                id: "scheduledEndTime",
                value: props.schedule.scheduledEndTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined,
                isReadOnly: isReadOnly,
            },
            {
                label: "Repeat Weeks (0 for indefinit)" ,
                id: "repeat",
                value: props.schedule.repeat,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined,
                isReadOnly: isReadOnly,
                isHidden: isReadOnly,
            },
            {
                label: "Group",
                id: "groupId",
                value: props.schedule.groupId,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: groups,
                isReadOnly: isReadOnly,
            },
            {
                label: "Description" ,
                id: "description",
                value: props.schedule.description,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: false,
                type: "text",
                selectOptions: undefined,
                isReadOnly: isReadOnly,
                isHidden: isReadOnly,
            },
            {
                label: "Cancelled",
                id: "isCancelled",
                checkedValue: props.schedule.isCancelled,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: false,
                type: "checkbox",
                selectOptions: undefined,
                isHidden: props.schedule.id == 0,
            },
        ];

        return(
            <Fragment>
                <div className="fieldSetHeader">{
                    props.schedule.timeTableEntryId ? "Timetable Entry (Manage from timetables)" :  "Schedule Entry"}</div>
                <Form onFieldValidationChanged={handleFieldValidationChanged} 
                      fields={fields}
                formObject={props.schedule}/>
            </Fragment>
        );
    }
    function handleFieldValidationChanged(isValid: boolean) {
        if (props.onValidationChanged) {
            props.onValidationChanged(isValid);
        }
    }

    return (
        <div className="scheduleWizardContainer">
            <div className="scheduleWizardBody">
                {renderForms()}
            </div>
        </div>);
};

export default ScheduleWizard;
