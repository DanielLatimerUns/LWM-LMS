import React, {Fragment, JSX} from "react";
import './people-wizard.css';
import { Person } from "../../../../entities/domainModels/person";
import { Group } from "../../../../entities/domainModels/group";
import { Student } from "../../../../entities/domainModels/student";
import Form, { FormField } from "../../../../framework/components/form/form";
import personType from "../../../../entities/enums/personType";
import {useQueryLwm} from "../../../../services/network/queryLwm.ts";

export interface Props {
    person?: Person;
    onValidationChanged?: Function;
    onChange: Function;
}

const PeopleWizard: React.FunctionComponent<Props> = (props) => {
    if (!props.person) {
        return ;
    }
    
    const groupsQuery = 
        useQueryLwm<Group[]>('groups', 'group');

    function renderForms() {
        const fields: FormField[] = [
            {
                label: "Person Type" ,
                id: "personType",
                value: props.person?.personType,
                onFieldChanged: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: [
                    <option value={personType.Basic}>Basic</option>,
                    <option value={personType.Student}>Student</option>,
                    <option value={personType.Teacher}>Teacher</option>,
                ]
            },
            {
                label: "Forename" ,
                id: "forename",
                value: props.person?.forename,
                onFieldChanged: handleFormChange,
                required: true,
                type: "text",
            },
            {
                label: "Surname" ,
                id: "surname",
                value: props.person?.surname,
                onFieldChanged: handleFormChange,
                required: true,
                type: "text",
            },
            {
                label: "Email" ,
                id: "emailAddress1",
                value: props.person?.emailAddress1,
                onFieldChanged: handleFormChange,
                required: true,
                type: "text",
            },
            {
                label: "Phone" ,
                id: "phoneNo",
                value: props.person?.phoneNo,
                onFieldChanged: handleFormChange,
                validationPattern: "[0-9]+",
                required: false,
                type: "text",
            },
            {
                label: "Notes",
                id: "notes",
                value: props.person?.notes,
                onFieldChanged: handleFormChange,
                required: false,
                type: "textarea",
            },
        ];

        if (props.person?.personType !== personType.Student) {
            return (
            <Fragment>
                <div className="fieldSetHeader">Person Record</div>
                <Form fields={fields}
                      formObject={props.person}
                      onFieldValidationChanged={handleFieldValidationChanged}/>
            </Fragment>);
        }

        const builtGroups: JSX.Element[] = [
            <option value={-1}>Select a Group</option>
        ];

        groupsQuery.data?.map(group => builtGroups.push(
            <option value={group.id}>{group.name}</option>)
        );

        const studentFields: FormField[] = [
            {
                label: "Group",
                id: "groupId",
                value: props.person.student?.groupId,
                onFieldChanged: handleStudentFormChange,
                required: false,
                type: "select",
                selectOptions: builtGroups
            },
            {
                label: "Session Payment Method" ,
                id: "paymentMethod",
                value: props.person.student?.paymentMethod,
                onFieldChanged: handleStudentFormChange,
                required: false,
                type: "text",
            },
            {
                label: "Session Payment Amount" ,
                id: "sessionPaymentAmount",
                value: props.person.student?.sessionPaymentAmount,
                onFieldChanged: handleStudentFormChange,
                required: false,
                type: "text",
            },
        ]

        return (
            <Fragment>
                <div className="fieldSetHeader">Person Record</div>
                <Form fields={fields} formObject={props.person} onFieldValidationChanged={handleFieldValidationChanged}/>
                <div className="fieldSetHeader">Student Record</div>
                <Form fields={studentFields} formObject={props.person.student} onFieldValidationChanged={handleFieldValidationChanged}/>
            </Fragment>
        )
    }
    
    function handleFormChange(changedPerson: Person) {
        changedPerson.personType = Number.parseInt((changedPerson.personType as any));

        props.onChange(changedPerson);
    }

    function handleStudentFormChange(changedStudent: Student) {
        const updatedPerson = Object.assign({}, props.person);
        const updatedStudent = Object.assign({}, updatedPerson.student);
        updatedPerson.student = updatedStudent;
        
        updatedStudent.groupId = Number.parseInt((changedStudent.groupId as any));
        updatedStudent.paymentMethod = changedStudent.paymentMethod as string;
        updatedStudent.sessionPaymentAmount = Number.parseInt((changedStudent.sessionPaymentAmount as any));
        
        props.onChange(updatedPerson);
    }

    function handleFieldValidationChanged(isValid: boolean) {
        if (props.onValidationChanged) {
            props.onValidationChanged(isValid);
        }
    }
        return(
            <div className="personWizardContainer">
                <div className="personWizardBody">
                    {renderForms()}
                </div>
            </div>);
};

export default PeopleWizard;
