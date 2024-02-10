import React, { Fragment, useEffect, useState } from "react";
import './group-wizard.css';
import Teacher from "../../../../entities/domainModels/teacher";
import RestService from "../../../../services/network/RestService";
import Group from "../../../../entities/domainModels/group";
import Student from "../../../../entities/domainModels/student";
import GroupWizardStudents from "./applets/group-wizard-students/group-wizard-students";
import FormField from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";

export interface Props {
    group: Group;
    onValidationChanged?: Function;
    onChange: Function;
}

const GroupWizard: React.FunctionComponent<Props> = (props) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [assignedStudents, setAssignedStudents] = useState<Student[]>([]);

    useEffect(() => {
        getTeachers();
        getAssigneStudents();
    }, []);

    function renderForms() {
        const builtTeachers: JSX.Element[] = [
            <option value={-1}>Select a Teacher</option>
        ];

        teachers.map(teachher => builtTeachers.push(
        <option value={teachher.id}>{teachher.name}</option>))

        const fields: FormField[] = [
            {
                label: "Name" ,
                id: "name",
                value: props.group.name,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Teacher",
                id: "teacherId",
                value: props.group.teacherId,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: builtTeachers
            }
        ];

        return(
            <Fragment>
                <div className="fieldSetHeader">Group Record</div>
                <Form onFieldValidationChanged={handleFieldValidationChanged} fields={fields}/>
            </Fragment>)
    }

    function handleFormChange(e: any) {
        const changedgroup: Group = Object.assign({}, props.group);
        const targetField: string = e.target.value;

        for (const field in changedgroup) {
            if (field === e.target.id) {
                (changedgroup as any)[field] = targetField;
            }
        }

        changedgroup.teacherId = (changedgroup.teacherId as number);

        props.onChange(changedgroup);
    }

    function handleFieldValidationChanged(isValid: boolean) {
        if (props.onValidationChanged) {
            props.onValidationChanged(isValid);
        }
    }

    function getTeachers() {
        RestService.Get('teacher').then(
            resoponse => resoponse.json().then(
                (data: Teacher[]) => setTeachers(data)
            ).catch( error => console.error(error))
        );
    }

    function getAssigneStudents() {
        if (props.group.id === 0 )
            return;

        RestService.Get(`group/${props.group.id}/students`).then(
            resoponse => resoponse.json().then(
                (data: Student[]) => setAssignedStudents(data)
            ).catch( error => console.error(error))
        );
    }

    return (
        <div className="groupWizardContainer">
            <div className="groupWizardBody">
                {renderForms()}
                <GroupWizardStudents
                    students={assignedStudents}>
                </GroupWizardStudents>
            </div>
        </div>);
}

export default GroupWizard;
