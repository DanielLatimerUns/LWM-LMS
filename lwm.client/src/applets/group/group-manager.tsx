import React, { useEffect, useState } from "react";
import RestService from "../../services/network/RestService";
import './group-manager.css';
import LwmButton from "../../framework/components/button/lwm-button";
import Module, { GridRow, GridColumn} from "../../framework/components/module/module";
import { Group } from "../../entities/domainModels/group";
import GroupWizard from "./applets/group-wizard/group-wizard";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';

export interface Props {}

const GroupManager: React.FunctionComponent<Props> = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group>({
        name: "",
        id: 0,
        teacherId: -1,
        completedLessonNumber: 0
    });
    
    const [error, setError] = useState<string | undefined>('All fields required');
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isGettingData, setIsGettingData] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>();

    useEffect(() => {
        if (requiresUpdate) {
            setIsGettingData(true);
            getGroups();
            setRequiresUpdate(false);
            setAppletActive(false);
        }
    }, [requiresUpdate]);

    useEffect(() => {
        setIsGettingData(false);
    }, [groups])

    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Name", name: "name"},
        ];

        const rows: GridRow[] =
        groups.map(group => ({columnData: group, id: group.id}));

        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: handleEditGroup,
                handleDeleteClicked: handleDeleteGroup,
            };

        return gridConfig;
    }

    function buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton
                    isSelected={!appletActive}
                    onClick={() => setAppletActive(false)}
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={handleAddNewGroup}
                    name={(!appletActive||
                        selectedGroup?.id === 0) ? "Add" :
                        "Edit : " + selectedGroup?.name}
                    icon={newIcon}>
                </LwmButton>
            )
        ];
        return options;
    }

    function getGroups() {
        if (searchString) {
            RestService.Get(`group/${searchString}`).then(
                resoponse => resoponse.json().then(
                    (data: Group[]) => setGroups(data)
                ).catch( error => console.error(error))
            );
            return;
        }

        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => setGroups(data)
            ).catch( error => console.error(error))
        );
    }

    function handleAddNewGroup() {
        const group: Group = {
            name: "",
            id: 0,
            teacherId: -1,
            completedLessonNumber: 0
        };

        setSelectedGroup(group);
        setAppletActive(true);
    }

    function handleEditGroup(group: Group) {
        setSelectedGroup(group);
        setAppletActive(true);
    }

    function handleDeleteGroup(group: Group) {
        RestService.Delete(`group/${group.id}`).then(() => getGroups());
    }

    function handleDataChange(response: Response) {
        if (!response.ok) {
            setError(response.statusText);
            return;
        }
        setRequiresUpdate(true);
    }

    function handleAppletCancel() {
        setError(undefined);
        setAppletActive(false);
    }

    function handleAppletSave() {
        if (error) {
            return;
        }

        if (selectedGroup?.id === 0) {
            RestService.Post('group', selectedGroup).then(handleDataChange).catch( error =>
                console.error(error)
            )
            return;
        }

        RestService.Put('group', selectedGroup).then(handleDataChange).catch( error =>
            console.error(error)
        )
    }
    
    const handldeSearchChanged = (searchString: string) => {
        setSearchString(searchString !== '' ? searchString : undefined);
        setRequiresUpdate(true);
    }

    return (
        <Module
            gridConfig={buildGridConfig()}
            isLoading={isGettingData}
            onSearchChnaged={handldeSearchChanged}
            moduleName="Group Center"
            moduleEntityName="Group"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            error={error}
            appletActive={appletActive}>
             <GroupWizard
                onChange={(group: Group) => setSelectedGroup(group)}
                onValidationChanged={(isValid: boolean) => setError(isValid ? undefined : "Required fields not set")}
                group={selectedGroup}>
            </GroupWizard>
        </Module>
    );
}

export default GroupManager;
