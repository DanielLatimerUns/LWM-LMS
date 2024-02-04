import React from "react";
import RestService from "../../services/network/RestService";
import './group-manager.css';
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";
import Group from "../../entities/domainModels/group";
import GroupWizard from "./applets/group-wizard/group-wizard";

import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';


export interface Props {
    
}
 
export interface State {
    groups: Group[]
    selectedGroup?: Group,
    activeActionApplet: JSX.Element | undefined,
    hasError: boolean,
    error?: string
}
 
export default class GroupManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
            
        this.state = {
            groups: [], 
            selectedGroup: undefined, 
            activeActionApplet: undefined,
            hasError: false,
            error: 'All fields required'
        }
    }

    componentDidMount() {
        this.getGroups();
    }

    render() { 
        return ( 
            <Module 
                gridConfig={this.buildGridConfig()}
                moduleName="Group Center"
                moduleEntityName="Group"
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
            {lable: "Name", name: "name"},
        ];

        const rows: GridRow[] = 
        this.state.groups.map(group => ({columnData: group, id: group.id}));
        
        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: this.handleEditGroup.bind(this),
                handleDeleteClicked: this.handleDeleteGroup.bind(this),
            };

        return gridConfig;
    }

    private buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet === undefined} 
                    onClick={() => this.setState({activeActionApplet: undefined, selectedGroup: undefined})} 
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton 
                    isSelected={this.state.activeActionApplet?.type === GroupWizard}  
                    onClick={this.handleAddNewGroup.bind(this)} 
                    name={(this.state.selectedGroup === undefined || 
                        this.state.selectedGroup?.id === 0) ? "Add" : 
                        "Edit : " + this.state.selectedGroup?.name}
                    icon={newIcon}>    
                </LwmButton>
            )
        ];
        return options;
    }

    private getGroups() {        
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => this.setState(
                    {groups: data})
            ).catch( error => console.error(error))
        );
    }

    private handleAddNewGroup() {
        const group: Group = {
            name: "", 
            id: 0, 
            teacherId: -1,
            completedLessonNumber: 0
        };

        this.setState({selectedGroup: group})

        const applet = 
                <GroupWizard
                    onValidationChanged={this.handleValidationChanged.bind(this)}
                    group={group}>
                </GroupWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleEditGroup(group: Group) {
        this.setState({selectedGroup: group});

        const applet = <GroupWizard 
                            onValidationChanged={this.handleValidationChanged.bind(this)}
                            group={group}>
                        </GroupWizard>;

        this.setState({activeActionApplet: applet });
    }

    private handleDeleteGroup(group: Group) {
        RestService.Delete(`group/${group.id}`).then(() => this.getGroups());
    }

    private handleGroupChange() {
        this.getGroups();
        this.setState({activeActionApplet: undefined, selectedGroup: undefined});
    }

    private handleAppletCancel() {
        this.setState({activeActionApplet: undefined, selectedGroup: undefined});
    }

    private handleAppletSave() {
        if (this.state.hasError) {
            this.setState({hasError: true, error: "Required fields not set"});
            return;
        }

        if (this.state.selectedGroup?.id === 0) {
            RestService.Post('group', this.state.selectedGroup).then( data =>
                data.json().then(this.handleGroupChange.bind(this))
            ).catch( error =>
                console.error(error)
            )
            return;
        }

        RestService.Put('group', this.state.selectedGroup).then(
            this.handleGroupChange.bind(this)
        ).catch( error =>
            console.error(error)
        )
    }

    private handleValidationChanged(isValid: boolean) {
        this.setState({hasError: !isValid});
    }
}
