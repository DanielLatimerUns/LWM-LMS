import React, { Fragment } from "react";
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
                {this.renderForms()}
                <GroupWizardStudents
                    students={this.state.assignedStudents}>
                </GroupWizardStudents>
            </div>
        </div>);
    }

    private renderForms() {
        const teachers: JSX.Element[] = [
            <option value={-1}>Select a Teacher</option>
        ];

        this.state.teachers.map(teachher => teachers.push(
        <option value={teachher.id}>{teachher.name}</option>))

        const fields: FormField[] = [
            {
                label: "Name" ,
                id: "name",
                value: this.props.group.name,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "text",
                selectOptions: undefined
            },
            {
                label: "Teacher",
                id: "teacherId",
                value: this.props.group.teacherId,
                onFieldChangedSuccsess: this.handleFormChange.bind(this),
                validationPattern: undefined,
                required: true,
                type: "select",
                selectOptions: teachers
            }
        ];

        return(            
        <Fragment>
            <div className="fieldSetHeader">Group Record</div>
            <Form onFieldValidationChanged={this.handleFieldValidationChanged.bind(this)} fields={fields}/>
        </Fragment>)
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

        this.setState({group: changedgroup})
    }

    private handleFieldValidationChanged(isValid: boolean) {
        if (this.props.onValidationChanged) {
            this.props.onValidationChanged(isValid);
        }
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
        if (this.state.group.id === 0 )
            return;
        
        RestService.Get(`group/${this.state.group.id}/students`).then(
            resoponse => resoponse.json().then(
                (data: Student[]) => this.setState(
                    {assignedStudents: data})
            ).catch( error => console.error(error))
        );
    }
}
