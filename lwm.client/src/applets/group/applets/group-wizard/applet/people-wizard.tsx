import React from "react";
import './people-wizard.css';
import { Person } from "../../../types/person";
import PersonWizardForm from "../applets/person-wizard-form/person-wizard-form";

export interface Props {
    person: Person;
}
 
export interface State {
    person: Person;
}
 
export default class PeopleWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {person: this.props.person}
    }

    render() { 
        return ( 
        <div className="lessonWizardContainer">
            <div className="lessonWizardBody">
                <PersonWizardForm person={this.state.person} handleFormChange={this.handleFormChange.bind(this)}/>
            </div>
        </div>);
    }

    private handleFormChange(e: any) {
        const changedPerson: Person = Object.assign(this.state.person);
        const targetField: string = e.target.value;

        for (const field in changedPerson) {
            if (field === e.target.id) {
                (changedPerson as any)[field] = targetField;
            }
        }

        changedPerson.personType = (changedPerson.personType as number);

        if (e.target === null) return;
        this.setState({person: changedPerson})
    }
}
