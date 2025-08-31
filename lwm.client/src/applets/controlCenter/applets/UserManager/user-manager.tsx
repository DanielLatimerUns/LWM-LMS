import React, {JSX, useEffect, useState} from "react";
import LwmButton from "../../../../framework/components/button/lwm-button.tsx";
import RestService from "../../../../services/network/RestService.ts";
import Module, { GridColumn, GridRow} from "../../../../framework/components/module/module.tsx";
import { User } from "../../../../entities/app/User.ts";
import { newRecordIcon } from '../../../../framework/icons.ts'
import UserWizard from "./wizard/user-manager-wizard.tsx";
export interface Props {}

const UserManager: React.FunctionComponent<Props> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>({
        email: "",
        userName: "",
        id: 1
    });
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('All fields required');
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isGettingData, setIsGettingData] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>();

    useEffect(() => {
        if (requiresUpdate) {
            setIsGettingData(true);
            getUsers();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate]);

    useEffect(() => {
        setIsGettingData(false);
    }, [users])
    
    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Username", name: "userName"},
            {lable: "Email", name: "email"},
        ];

        const rows: GridRow[] =
            users.map(user => ({columnData: user, id: user.id}));

        const gridConfig = {
            columns: columns,
            rows: rows,
            handleEditClicked: handleEditUser,
            handleDeleteClicked: handleDeleteUser,
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
                    icon={newRecordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={handleAddNewUser}
                    name={(!appletActive ||
                        selectedUser.id === 0) ? "Add" :
                        "Edit: " + selectedUser.userName}
                    icon={newRecordIcon}>
                </LwmButton>
            )
        ];

        return options;
    }

    function getUsers() {
        if (searchString) {
            RestService.Get(`user/${searchString}`).then(
                response => response.json().then(
                    (data: User[]) => setUsers(data)
                ).catch(error => console.error(error))
            );
            return;
        }

        RestService.Get('user').then(
            response => response.json().then(
                (data: User[]) => setUsers(data)
            ).catch(error => console.error(error))
        );
    }

    function handleAddNewUser() {
        const user: User = {
            userName: "",
            email: "",
            id: 0,
            password: ""
        };

        setSelectedUser(user);
        setAppletActive(true);
    }

    function handleEditUser(user: User) {
        setSelectedUser(user);
        setAppletActive(true);
    }

    function handleDeleteUser(user: User) {
        RestService.Delete(`user/${user.id}`).then(() => getUsers());
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

        if (selectedUser?.id === 0) {
            RestService.Post('user', selectedUser).then(handleDataChange)
                .catch(error => {
                    console.error(error);
                    setError("Critical error");
                }
            )
            return;
        }

        RestService.Put('user', selectedUser).then(handleDataChange)
            .catch(error => {
                console.error(error);
                setError("Critical error");
            }
        )
    }
    
    const handldeSearchChanged = (searchString: string) => {
        setSearchString(searchString !== '' ? searchString : undefined);
        setRequiresUpdate(true);
    }

    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="User Center"
            moduleEntityName="User"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            error={error}
            appletActive={appletActive}
            onSearchChnaged={handldeSearchChanged}
            isLoading={isGettingData}>
                <UserWizard
                    onChange={(user: User) => setSelectedUser(user)}
                    onValidationChanged={(isValid: boolean) => setError(isValid ? undefined : "Required fields not set")}
                    user={selectedUser}>
                </UserWizard>
        </Module>
    );
};

export default UserManager;
