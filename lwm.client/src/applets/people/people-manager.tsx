import React from "react";
import RestService from "../../services/network/RestService";
import './people-manager.css';
import { Person } from "../../entities/domainModels/person";
import LwmButton from "../../framework/components/button/lwm-button";
import PeopleWizard from "./applets/people-wizard/people-wizard";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";

import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';


export interface Props {
    
}
 
export interface State {
    persons: Person[]
    selectedPerson?: Person,
    activeActionApplet: JSX.Element | undefined,
    hasError: boolean,
    error?: string
}
 
export default class PersonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);           
        this.state = {
            persons: [], 
            selectedPerson: undefined, 
            activeActionApplet: undefined,
            hasError: false,
            error: 'All fields required'
        }
    }

    componentDidMount() {
        this.getPeople();
    }

    render() { 
        return ( 
            <Module 
                gridConfig={this.buildGridConfig()}
                moduleName="Person Center"
                moduleEntityName="Person"
                handleCloseClicked={this.handleAppletCancel.bind(this)}
                handleSaveCloseClicked={this.handleAppletSave.bind(this)}
                options={this.buildActionOptions()}
                hasError={this.state.hasError}
                error={this.state.error}>
                {this.state.activeActionApplet}
            </Module>
        );
    }

    private buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Forename", name: "forename"},
            {lable: "Surname", name: "surname"},
            {lable: "Email", name: "emailAddress1"},
            {lable: "Phone", name: "phoneNo"},
        ];

        const rows: GridRow[] = 
        this.state.persons.map(person => ({columnData: person, id: person.id}));
        
        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: this.handleEditPerson.bind(this),
                handleDeleteClicked: this.handleDeletePerson.bind(this),
            };

        return gridConfig;
    }

    private buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet === undefined} 
                    onClick={() => this.setState({activeActionApplet: undefined, selectedPerson: undefined})} 
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet?.type === PeopleWizard}  
                    onClick={this.handleAddNewPerson.bind(this)} 
                    name={(this.state.selectedPerson === undefined || 
                        this.state.selectedPerson?.id === 0) ? "Add" : 
                        "Edit: " + this.state.selectedPerson?.forename}
                    icon={newIcon}>    
                </LwmButton>
            )
        ];

        return options;
    }

    private getPeople() {        
        RestService.Get('person').then(
            resoponse => resoponse.json().then(
                (data: Person[]) => this.setState(
                    {persons: data})
            ).catch( error => console.error(error))
        );
    }

    private handleAddNewPerson() {
        const person: Person = {
            forename: "", 
            surname: "", id: 0, 
            emailAddress1: "", 
            phoneNo: "",
            personType: 1
        };

        this.setState({selectedPerson: person})

        const applet = 
                <PeopleWizard 
                    onValidationChanged={this.handleValidationChanged.bind(this)}
                    person={person}>
                </PeopleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleEditPerson(person: Person) {
        this.setState({selectedPerson: person});

        const applet = 
                <PeopleWizard 
                    onValidationChanged={this.handleValidationChanged.bind(this)}
                    person={person}>
                </PeopleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleDeletePerson(person: Person) {
        RestService.Delete(`person/${person.id}`).then(() => this.getPeople());
    }

    private handleLessonChange() {
        this.getPeople();
        this.setState({activeActionApplet: undefined, selectedPerson: undefined});
    }

    private handleAppletCancel() {
        this.setState({activeActionApplet: undefined, selectedPerson: undefined});
    }

    private handleAppletSave() {
        if (this.state.hasError) {
            this.setState({hasError: true, error: "Required fields not set"});
            return;
        }

        if (this.state.selectedPerson?.id === 0) {
            RestService.Post('person', this.state.selectedPerson).then( data =>
                data.json().then(this.handleLessonChange.bind(this))
            ).catch( error =>
                console.error(error)
            )
            return;
        }

        RestService.Put('person', this.state.selectedPerson).then(
            this.handleLessonChange.bind(this)
        ).catch( error =>
            console.error(error)
        )
    }

    private handleValidationChanged(isValid: boolean) {
        this.setState({hasError: !isValid});
    }
}
