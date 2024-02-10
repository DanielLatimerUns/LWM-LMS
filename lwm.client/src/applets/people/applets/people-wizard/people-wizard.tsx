import React, { Fragment, useEffect, useState } from "react";
import './people-wizard.css';
import { Person } from "../../../../entities/domainModels/person";
import Group from "../../../../entities/domainModels/group";
import RestService from "../../../../services/network/RestService";
import Student from "../../../../entities/domainModels/student";
import FormField from "../../../../entities/framework/formField";
import Form from "../../../../framework/components/form/form";
import personType from "../../../../entities/enums/personType";

export interface Props {
    person: Person;
    onValidationChanged?: Function;
    onChange: Function;
};

const PeopleWizard: React.FunctionComponent<Props> = (props) => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        if (props.person.personType === personType.Student) {
            getGroups();
            getStudentRecord();
        }
    }, []);

    function renderForms() {
        const fields: FormField[] = [
            {
                label: "Person Type" ,
                id: "personType",
                value: props.person.personType,
                onFieldChangedSuccsess: handleFormChange,
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
                value: props.person.forename,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Surname" ,
                id: "surname",
                value: props.person.surname,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Email" ,
                id: "emailAddress1",
                value: props.person.emailAddress1,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Phone" ,
                id: "phoneNo",
                value: props.person.phoneNo,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: "[0-9]+",
                required: false,
                type: "text",
                selectOptions: undefined
            }
        ];

        if (props.person.personType !== personType.Student) {
            return (
            <Fragment>
                <div className="fieldSetHeader">Person Record</div>
                <Form fields={fields} onFieldValidationChanged={handleFieldValidationChanged}/>
            </Fragment>);
        }

        const builtGroups: JSX.Element[] = [
            <option value={-1}>Select a Group</option>
        ];

        groups.map(group => builtGroups.push(
            <option value={group.id}>{group.name}</option>)
        );

        const studentFields: FormField[] = [
            {
                label: "Group",
                id: "groupId",
                value: props.person.student?.groupId,
                onFieldChangedSuccsess: handleFormChange,
                validationPattern: undefined,
                required: false,
                type: "select",
                selectOptions: builtGroups
            }
        ]

        return (
        <Fragment>
            <div className="fieldSetHeader">Person Record</div>
            <Form fields={fields} onFieldValidationChanged={handleFieldValidationChanged}/>
            <div className="fieldSetHeader">Student Record</div>
            <Form fields={studentFields} onFieldValidationChanged={handleFieldValidationChanged}/>
        </Fragment>)
    }

    function getGroups() {
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => setGroups(data)
            ).catch( error => console.error(error))
        );
    }

    function getStudentRecord() {
        RestService.Get(`person/${props.person.id}/student`).then(
            resoponse => resoponse.json().then(
                (data: Student[]) => {
                    const updatedPerson = Object.assign({}, props.person);
                    updatedPerson.student = data[0];

                    props.onChange(updatedPerson);
                }
            ).catch( error => console.error(error))
        );
    }

    function handleFormChange(e: any) {
        const changedPerson = Object.assign({}, props.person);
        const targetField: string = e.target.value;

        for (const field in changedPerson) {
            if (field === e.target.id) {
                (changedPerson as any)[field] = targetField;
            }
        }

        for (const field in changedPerson.student) {
            if (field === e.target.id) {
                (changedPerson.student as any)[field] = targetField;
            }
        }

        for (const field in changedPerson.teacher) {
            if (field === e.target.id) {
                (changedPerson.teacher as any)[field] = targetField;
            }
        }

        changedPerson.personType = Number.parseInt((changedPerson.personType as any));

        if (changedPerson.student) {
            changedPerson.student.groupId =  Number.parseInt((changedPerson.student.groupId as any));
        }

        props.onChange(changedPerson);
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
