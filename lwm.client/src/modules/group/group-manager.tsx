import React, {JSX, useState} from "react";
import RestService from "../../services/network/RestService";
import './group-manager.css';
import LwmButton from "../../framework/components/button/lwm-button";
import Module, { GridRow, GridColumn} from "../../framework/components/module/module";
import { Group } from "../../entities/domainModels/group";
import GroupWizard from "./applets/group-wizard/group-wizard";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import {useQueryLwm} from "../../services/network/queryLwm.ts";

export interface Props {}

const GroupManager: React.FunctionComponent<Props> = () => {
    const [selectedGroup, setSelectedGroup] = useState<Group>();
    
    const [error, setError] = useState<string | undefined>();
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    
    const groupQuery = useQueryLwm<Group[]>(`groups_${searchString}`, `group/${searchString}`);

    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Name", name: "name"},
        ];

        const rows: GridRow[] =
        groupQuery.data?.map(group => ({columnData: group, id: group.id})) ?? [];

        return {
            columns: columns,
            rows: rows,
            handleEditClicked: handleEditGroup,
            handleDeleteClicked: handleDeleteGroup,
        };
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
        RestService.Delete(`group/${group.id}`).then(() => groupQuery.refetch());
    }
    
    function handleAppletCancel() {
        setError(undefined);
        setAppletActive(false);
    }

    async function handleAppletSave() {
        if (!isFormValid) {
            return;
        }

        if (selectedGroup?.id === 0) {
            const result = await RestService.Post('group', selectedGroup);
            if (!result.ok) {
                setError(await result.text());
                return;
            }
            
            await groupQuery.refetch();
            setError(undefined);
            setAppletActive(false);
            return;
        }

        const result = await RestService.Put('group', selectedGroup);
        if (!result.ok) {
            setError(await result.text());
            return;
        }
        
        await groupQuery.refetch();
        setError(undefined);
    }
    
    return (
        <Module
            gridConfig={buildGridConfig()}
            isLoading={groupQuery.isPending}
            onSearchChnaged={() => setSearchString(searchString)}
            moduleName="Group Center"
            moduleEntityName="Group"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            error={error}
            appletActive={appletActive}>
             <GroupWizard
                onChange={(group: Group) => setSelectedGroup(group)}
                onValidationChanged={(isValid: boolean) => setIsFormValid(isValid)}
                group={selectedGroup}>
            </GroupWizard>
        </Module>
    );
}

export default GroupManager;
