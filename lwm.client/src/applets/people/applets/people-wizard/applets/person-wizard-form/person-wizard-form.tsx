import React from "react";
import Form from "../../../../../../framework/components/form/form";
import { Person } from "../../../../../../entities/domainModels/person";
import Group from "../../../../../../entities/domainModels/group";

interface Props {
    person: Person;
    handleFormChange: Function;
    groups: Group[];
}
 
interface State {
}
 
export default class PeopleWizardForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="personWizardFormContainer">
                <Form>
                    <select 
                            key="Person Type" 
                            id="personType"
                            value={this.props.person.personType}
                            onChange={this.props.handleFormChange.bind(this)}>
                                <option value={undefined}>Basic</option>
                                <option value={1}>Student</option>
                                <option value={2}>Teacher</option>
                    </select>
                    <input 
                        key="Forename" 
                        type="text"
                        id="forename" 
                        value={this.props.person.forename}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <input 
                        key="Surname" 
                        type="text" 
                        id="surname"
                        readOnly= {false}
                        value={this.props.person.surname}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <input 
                        key="Email" 
                        type="text"
                        id="emailAddress1" 
                        value={this.props.person.emailAddress1}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <input 
                        key="Phone" 
                        type="text" 
                        id="phoneNo"
                        readOnly= {false}
                        value={this.props.person.phoneNo}
                        onChange={this.props.handleFormChange.bind(this)}/>
                </Form>
                {this.renderStudentForm()}
            </div>
        );
    }

    private renderStudentForm() {
        if (this.props.person.personType !== 1) { return; }

        return(<Form>{[
                    <select 
                            key="Group" 
                            id="groupId"
                            value={this.props.person.student?.groupId}
                            onChange={this.props.handleFormChange.bind(this)}>
                                <option value={undefined}>Select a Group</option>
                                {this.props.groups.map(group => 
                                    <option value={group.id
                                    }>{group.name}</option>
                                )}
                    </select>]}
                </Form>);
    }
}
