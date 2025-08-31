import React, {Fragment, JSX} from "react";
import './schedule-wizard.css';
import {Group} from "../../../../entities/domainModels/group";
import {Schedule} from "../../../../entities/domainModels/schedule";
import {FormField} from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";

export interface Props {
    schedule: Schedule;
    onValidationChanged?: Function;
    groups: Group[];
    onChange: Function;
}

const ScheduleWizard: React.FunctionComponent<Props> = (props) => {

    function renderForms() {
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


        const fields: FormField[] = [
            {
                label: "Day Of Week",
                id: "scheduledDayOfWeek",
                value: props.schedule.schedualedDayOfWeek,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek
            },
            {
                label: "Start Time" ,
                id: "scheduledStartTime",
                value: props.schedule.schedualedStartTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "End Time" ,
                id: "scheduledEndTime",
                value: props.schedule.schedualedEndTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "Repeat Weeks (0 for indefinit)" ,
                id: "repeat",
                value: props.schedule.repeat,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Start Week" ,
                id: "startWeek",
                value: props.schedule.startWeek,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Group",
                id: "groupId",
                value: props.schedule.groupId,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: groups
            },
        ];

        return(
            <Fragment>
                <div className="fieldSetHeader">Schedule Record</div>
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
