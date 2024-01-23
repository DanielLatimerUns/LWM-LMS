import React from "react";
import './group-wizard.css';
import GroupWizardForm from "./applets/group-wizard-form/group-wizard-form";
import Teacher from "../../../../entities/domainModels/teacher";
import RestService from "../../../../services/network/RestService";
import Group from "../../../../entities/domainModels/group";
import Student from "../../../../entities/domainModels/student";
import GroupWizardStudents from "./applets/group-wizard-students/group-wizard-students";

export interface Props {
    group: Group;
}
 
export interface State {
    group: Group;
    teachers: Teacher[];
    assignedStudents: Student[];
}
 
export default class GroupWizard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {group: this.props.group, teachers: [], assignedStudents: []}
    }

    componentDidMount(): void {
        this.getTeachers();
        this.getAssigneStudents();
    }

    render() { 
        return ( 
        <div className="groupWizardContainer">
            <div className="groupWizardBody">
                <GroupWizardForm 
                    group={this.state.group} 
                    teachers={this.state.teachers}
                    handleFormChange={this.handleFormChange.bind(this)}/>
                <GroupWizardStudents
                    students={this.state.assignedStudents}>
                </GroupWizardStudents>
            </div>
        </div>);
    }

    private handleFormChange(e: any) {
        const changedgroup: Group = Object.assign(this.state.group);
        const targetField: string = e.target.value;

        for (const field in changedgroup) {
            if (field === e.target.id) {
                (changedgroup as any)[field] = targetField;
            }
        }

        changedgroup.teacherId = (changedgroup.teacherId as number);

        if (e.target === null) return;
        this.setState({group: changedgroup})
    }

    private getTeachers() {
        RestService.Get('teacher').then(
            resoponse => resoponse.json().then(
                (data: Teacher[]) => this.setState(
                    {teachers: data})
            ).catch( error => console.error(error))
        );
    }

    private getAssigneStudents() {
        if (this.state.group.id === 0)
            return;
        
        RestService.Get(`group/${this.state.group.id}/students`).then(
            resoponse => resoponse.json().then(
                (data: Student[]) => this.setState(
                    {assignedStudents: data})
            ).catch( error => console.error(error))
        );
    }
}
