import React from 'react'
import {TimeTable, TimeTableEntry } from "../../../../entities/app/timeTable";
import Form, {FormField} from "../../../../framework/components/form/form";
import {Group} from "../../../../entities/domainModels/group";

export interface Props {
    timetable: TimeTable;
    onChange: Function;
    timetableEntry: TimeTableEntry;
    groups: Group[];
    onValidationChanged: Function;
}

const TimeTableEditorEntry: React.FunctionComponent<Props> = (props: Props) => {
    function buildForm() {
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
                id: "timeTableDayId",
                value: props.timetableEntry.timeTableDayId,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek
            },
            {
                label: "Start Time" ,
                id: "scheduledStartTime",
                value: props.timetableEntry.startTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "End Time" ,
                id: "scheduledEndTime",
                value: props.timetableEntry.endTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "Group",
                id: "groupId",
                value: props.timetableEntry.groupId,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: groups
            },
        ];
        
        return fields;
    }

    return (
        <div className="timetableTableForm">
            <Form formObject={props.timetableEntry}  
                  onFieldValidationChanged={props.onValidationChanged}
                  fields={buildForm()}/>
        </div>
    );
}

export default TimeTableEditorEntry;