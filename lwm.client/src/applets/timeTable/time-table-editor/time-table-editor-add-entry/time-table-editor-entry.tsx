import React, {JSX} from 'react'
import './time-table-editor-entry.css';
import {TimeTable, TimeTableEntry } from "../../../../entities/app/timeTable";
import Form, {FormField} from "../../../../framework/components/form/form";
import {Group} from "../../../../entities/domainModels/group";
import LwmButton from "../../../../framework/components/button/lwm-button.tsx";
import {Teacher} from "../../../../entities/domainModels/teacher.ts";

export interface Props {
    timetable: TimeTable;
    onChange: Function;
    timetableEntry: TimeTableEntry;
    groups: Group[];
    teachers: Teacher[];
    onValidationChanged: Function;
    onSave: Function;
    onClose: Function;
}

const TimeTableEditorEntry: React.FunctionComponent<Props> = (props: Props) => {
    function buildForm() {
        const groups: JSX.Element[] = [
            <option value={undefined}>Select a Group</option>
        ];

        const teachers: JSX.Element[] = [
            <option value={undefined}>Select a Teacher</option>
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
            <option value={group.id}>{group.name}</option>));
        
        props.teachers.map(teacher => teachers.push(
            <option value={teacher.id}>{teacher.name}</option>
        ));

        const fields: FormField[] = [
            {
                label: "Day Of Week",
                id: "dayNumber",
                value: props.timetableEntry.dayNumber,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: daysOfWeek
            },
            {
                label: "Start Time" ,
                id: "startTime",
                value: props.timetableEntry.startTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "End Time" ,
                id: "endTime",
                value: props.timetableEntry.endTime,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "time",
                selectOptions: undefined
            },
            {
                label: "Teacher",
                id: "teacherId",
                value: props.timetableEntry.teacherId,
                onFieldChanged: props.onChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: teachers
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
            <div className="timetableTableFormButtons">
                <LwmButton onClick={props.onSave} isSelected={false} name={"Save changes"}/>
                <LwmButton onClick={props.onClose} isSelected={false} name={"Close"}/>
            </div>
        </div>
    );
}

export default TimeTableEditorEntry;