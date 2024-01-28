import React from "react";
import './people-wizard.css';
import { Person } from "../../../../entities/domainModels/person";
import PersonWizardForm from "./applets/person-wizard-form/person-wizard-form";
import Group from "../../../../entities/domainModels/group";
import RestService from "../../../../services/network/RestService";
import Student from "../../../../entities/domainModels/student";

export interface Props {
    person: Person;
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
        this.getGroups();
        if (this.props.person.personType === 1) {
            this.getStudentRecord();
        }
    }

    render() { 
        return ( 
        <div className="personWizardContainer">
            <div className="personWizardBody">
                <PersonWizardForm 
                person={this.state.person}
                groups={this.state.groups}
                handleFormChange={this.handleFormChange.bind(this)}/>
            </div>
        </div>);
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

        if (e.target === null) return;
        this.setState({person: changedPerson})
    }
}
