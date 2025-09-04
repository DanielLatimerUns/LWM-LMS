import React, {JSX, useState} from "react";
import RestService from "../../services/network/RestService";
import './people-manager.css';
import { Person } from "../../entities/domainModels/person";
import LwmButton from "../../framework/components/button/lwm-button";
import PeopleWizard from "./applets/people-wizard/people-wizard";
import Module, {GridColumn, GridRow} from "../../framework/components/module/module";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import {useQueryLwm} from "../../services/network/queryLwm.ts";

export interface Props {}

const PersonManager: React.FunctionComponent<Props> = () => {
    const [selectedPerson, setSelectedPerson] = useState<Person>();
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('All fields required');
    const [searchString, setSearchString] = useState<string>("");
    
    const personQuery = 
        useQueryLwm<Person[]>(`persons_${searchString}`, `person/${searchString}`);
    
    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Forename", name: "forename"},
            {lable: "Surname", name: "surname"},
            {lable: "Email", name: "emailAddress1"},
            {lable: "Phone", name: "phoneNo"},
            {lable: "Group", name: "group"},
        ];
        
        const rows: GridRow[] =
        personQuery.data?.map(person => ({columnData: person, id: person.id})) ?? [];

        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: handleEditPerson,
                handleDeleteClicked: handleDeletePerson,
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
                    onClick={handleAddNewPerson}
                    name={(!appletActive ||
                        selectedPerson?.id === 0) ? "Add" :
                        "Edit: " + selectedPerson?.forename}
                    icon={newIcon}>
                </LwmButton>
            )
        ];

        return options;
    }

    function handleAddNewPerson() {
        const person: Person = {
            forename: "",
            surname: "", id: 0,
            emailAddress1: "",
            phoneNo: "",
            personType: 1
        };

        setSelectedPerson(person);
        setAppletActive(true);
    }

    function handleEditPerson(person: Person) {
        setSelectedPerson(person);
        setAppletActive(true);
    }

    function handleDeletePerson(person: Person) {
        RestService.Delete(`person/${person.id}`).then(() => personQuery.refetch());
    }

    function handleAppletCancel() {
        setAppletActive(false);
    }

    function handleAppletSave() {
        if (error) {
            return;
        }

        if (selectedPerson?.id === 0) {
            RestService.Post('person', selectedPerson).then(() => personQuery.refetch())
                .catch( error => {
                    setError(error)
                    return;
                }
            )
            setAppletActive(false);
            return;
        }

        RestService.Put('person', selectedPerson).then(() => personQuery.refetch()).catch( error => {
                setError(error)
                return;
            }
        )
        setAppletActive(false);
    }
    
    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="Person Center"
            moduleEntityName="Person"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            error={error}
            appletActive={appletActive}
            onSearchChnaged={(searchString: string) => setSearchString(searchString)}
            isLoading={personQuery.isPending}>
                <PeopleWizard
                    onChange={(person: Person) => setSelectedPerson(person)}
                    onValidationChanged={(isValid: boolean) => setError(isValid ? undefined : "Required fields not set")}
                    person={selectedPerson}>
                </PeopleWizard>
        </Module>
    );
};

export default PersonManager;
