import React from "react";
import Form from "../../../../../../framework/components/form/form";
import Group from "../../../../../../entities/domainModels/group";
import Teacher from "../../../../../../entities/domainModels/teacher";

interface Props {
    group: Group;
    teachers: Teacher[];
    handleFormChange: Function;
}
 
interface State {
}
 
export default class GroupeWizardForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="groupWizardFormContainer">
                <Form>
                    <input 
                        key="Name" 
                        type="text"
                        id="name" 
                        value={this.props.group.name}
                        onChange={this.props.handleFormChange.bind(this)}/>
                    <select 
                            key="Teacher" 
                            id="teacherId"
                            value={this.props.group.teacherId}
                            onChange={this.props.handleFormChange.bind(this)}>
                                <option value={undefined}>Select a Teacher</option>
                                {this.props.teachers.map(teacher => 
                                <option value={teacher.id}>{teacher.name}</option>)}
                    </select>
                </Form>
            </div>
        );
    }
}
