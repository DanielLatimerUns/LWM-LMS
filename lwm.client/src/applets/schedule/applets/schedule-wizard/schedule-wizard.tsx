import React, { Fragment } from "react";
import './schedule-wizard.css';
import Group from "../../../../entities/domainModels/group";
import Schedule from "../../../../entities/domainModels/schedule";
import FormField from "../../../../entities/framework/formField";
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
            <option value={6}>Saterday</option>,
            <option value={7}>Sunday</option>
        ];

        props.groups.map(group => groups.push(
        <option value={group.id}>{group.name}</option>))


        const fields: FormField[] = [
            {
                label: "Day Of Week",
                id: "schedualedDayOfWeek",
                value: props.schedule.schedualedDayOfWeek,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek
            },
            {
                label: "Start Time" ,
                id: "schedualedStartTime",
                value: props.schedule.schedualedStartTime,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "End Time" ,
                id: "schedualedEndTime",
                value: props.schedule.schedualedEndTime,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "Repeat Weeks (0 for indefinit)" ,
                id: "repeat",
                value: props.schedule.repeat,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Start Week" ,
                id: "startWeek",
                value: props.schedule.startWeek,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Group",
                id: "groupId",
                value: props.schedule.groupId,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: groups
            },
        ];

        return(
            <Fragment>
                <div className="fieldSetHeader">Schedule Record</div>
                <Form onFieldValidationChanged={handleFieldValidationChanged} fields={fields}/>
            </Fragment>
        );
    }

    function handleFormChange(e: any) {
        const changedSchedule = Object.assign({}, props.schedule);
        const targetField: string = e.target.value;

        for (const field in changedSchedule) {
            if (field === e.target.id) {
                (changedSchedule as any)[field] = targetField;
            }
        }

        props.onChange(changedSchedule);
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
