import React, {JSX, useState} from "react";
import RestService from "../../services/network/RestService";
import './group-manager.css';
import LwmButton from "../../framework/components/button/lwm-button";
import Module, { GridRow, GridColumn} from "../../framework/components/module/module";
import { Group } from "../../entities/domainModels/group";
import GroupWizard from "./applets/group-wizard/group-wizard";
import {useQueryLwm} from "../../services/network/queryLwm.ts";
import {toast} from "react-toastify";

export interface Props {}

const GroupManager: React.FunctionComponent<Props> = () => {
    const [selectedGroup, setSelectedGroup] = useState<Group>();
    
    const [error, setError] = useState<string | undefined>();
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    
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
                    name="Records">
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={handleAddNewGroup}
                    name={(!appletActive||
                        selectedGroup?.id === 0) ? "Add" :
                        "Edit : " + selectedGroup?.name}>
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
            toast.success('Group added successfully.');
            return;
        }

        const result = await RestService.Put('group', selectedGroup);
        if (!result.ok) {
            setError(await result.text());
            return;
        }
        
        await groupQuery.refetch();
        setError(undefined);
        setAppletActive(false);
        toast.success('Group updated successfully.');
    }
    
    return (
        <Module
            gridConfig={buildGridConfig()}
            isLoading={groupQuery.isPending}
            onSearchChnaged={(searchString: string) => setSearchString(searchString)}
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
