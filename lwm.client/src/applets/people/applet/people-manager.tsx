import React from "react";
import RestService from "../../../services/network/RestService";
import './people-manager.css';
import { Person } from "../types/person";
import LwmButton from "../../../framework/components/button/lwm-button";
import PeopleManagerGrid from "../applets/people-manager-grid/applet/people-manager-grid";
import PeopleWizard from "../applets/people-wizard/applet/people-wizard";

export interface Props {
    
}
 
export interface State {
    persons: Person[]
    selectedPerson?: Person,
    activeActionApplet: JSX.Element | undefined
}
 
export default class PersonManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
            
        this.state = {
            persons: [], 
            selectedPerson: undefined, 
            activeActionApplet: undefined
        }
    }

    render() { 
        return ( 
            <div className="personManagerContainer">
                <div className="personManagerActionSectionContainer">
                    {this.renderActionOptionsSection()}
                    <div className="personManagerActionSectionApplet">
                        {this.renderActionApplet()}
                    </div>
                </div>
            </div>);
    }

    componentDidMount() {
        this.getPeople();
    }

    private renderActionOptionsSection() {
        return(
            <div className="personManagerActionSectionOptionContainer">
                <div>
                    <LwmButton 
                        isSelected={this.state.activeActionApplet === undefined} 
                        onClick={() => this.setState({activeActionApplet: undefined, selectedPerson: undefined})} 
                        name="People Center">
                    </LwmButton>
                    <LwmButton 
                        isSelected={this.state.activeActionApplet?.type === PeopleWizard}  
                        onClick={this.handleAddNewPerson.bind(this)} 
                        name={this.state.selectedPerson ? "Edit Person: " + this.state.selectedPerson.forename : "Person Creation"}>    
                    </LwmButton>
                </div>
                {this.renderSaveClose()}
            </div>
        );
    }

    private renderSaveClose() {
        if (this.state.activeActionApplet?.type === PeopleManagerGrid || this.state.activeActionApplet === undefined)
            return;

        return <div>
                <LwmButton name="Save & Close" onClick={this.handleAppletSave.bind(this)} isSelected={false}></LwmButton>
                <LwmButton name="Cancel & Close" onClick={this.handleAppletCancel.bind(this)} isSelected={false}></LwmButton>
              </div>;
    }

    private renderActionApplet() {
        if (!this.state.activeActionApplet) {
            return this.renderDefaultApplet();
        }

        return this.state.activeActionApplet;
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
        const person: Person = {forename: "", surname: "", id: 0, emailAddress1: "", phoneNo: ""};
        this.setState({selectedPerson: person})

        const applet = <PeopleWizard 
                    person={person}>
                </PeopleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private renderDefaultApplet() {
        return <PeopleManagerGrid 
        persons={this.state?.persons ? this.state.persons : []} 
        handleEditPerson={this.handleEditPerson.bind(this)} 
        handleDeletePerson={this.handleDeletePerson.bind(this)}/>;
    }

    private handleEditPerson(person: Person) {
        this.setState({selectedPerson: person});

        const applet = <PeopleWizard 
                    person={person}>
                </PeopleWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleDeletePerson(person: Person) {
        RestService.Delete(`person/${person.id}`).then(() => this.getPeople());
    }

    private handleLessonChange() {
        this.getPeople();
        this.setState({activeActionApplet: this.renderDefaultApplet(), selectedPerson: undefined});
    }

    private handleAppletCancel() {
        this.setState({activeActionApplet: this.renderDefaultApplet(), selectedPerson: undefined});
    }

    private handleAppletSave() {
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
}
