import React, { Fragment } from "react";
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
}
 
export interface State {
    person: Person;
    groups: Group[];
}
 
export default class PeopleWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {person: this.props.person, groups: []}
    }

    componentDidMount(): void {
        if (this.props.person.personType === personType.Student) {
            this.getGroups();
            this.getStudentRecord();
        }
    }

    render() { 
        return ( 
        <div className="personWizardContainer">
            <div className="personWizardBody">
                {this.renderForms()}
            </div>
        </div>);
    }

    private renderForms() {
        const fields: FormField[] = [
            {
                label: "Person Type" ,
                id: "personType",
                value: this.props.person.personType,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
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
                value: this.props.person.forename,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Surname" ,
                id: "surname",
                value: this.props.person.surname,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Email" ,
                id: "emailAddress1",
                value: this.props.person.emailAddress1,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Phone" ,
                id: "phoneNo",
                value: this.props.person.phoneNo,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: "[0-9]+",
                required: false,
                type: "text",
                selectOptions: undefined
            }
        ];

        if (this.props.person.personType !== personType.Student) {
            return (
            <Fragment>
                <div className="fieldSetHeader">Person Record</div>
                <Form fields={fields} onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)}/>
            </Fragment>);
        }

        const groups: JSX.Element[] = [
            <option value={-1}>Select a Group</option>
        ];

        this.state.groups.map(group => groups.push(
        <option value={group.id}>{group.name}</option>))

        const studentFields: FormField[] = [
            {
                label: "Group",
                id: "groupId",
                value: this.props.person.student?.groupId,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: false,
                type: "select",
                selectOptions: groups
            }
        ]

        return (
        <Fragment>
            <div className="fieldSetHeader">Person Record</div>
            <Form fields={fields} onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)}/>
            <div className="fieldSetHeader">Student Record</div>
            <Form fields={studentFields} onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)}/>
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
    
    private getStudentRecord() {
        RestService.Get(`person/${this.props.person.id}/student`).then(
            resoponse => resoponse.json().then(
                (data: Student[]) => {
                    const updatedPerson = this.state.person;
                    updatedPerson.student = data[0];

                    this.setState(prevState => ({...prevState, person: updatedPerson}))
                } 
            ).catch( error => console.error(error))
        );
    }

    private handleFormChange(e: any) {
        const changedPerson = this.state.person;
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

        this.setState({person: changedPerson})
    }

    private handleFieldValidationChanged(isValid: boolean) {
        if (this.props.onValidationChanged) {
            this.props.onValidationChanged(isValid);
        }
    }
}
