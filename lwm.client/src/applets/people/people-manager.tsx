import React, { useEffect, useState } from "react";
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

export interface Props {}

const PersonManager: React.FunctionComponent<Props> = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person>({
        forename: "",
        surname: "", id: 0,
        emailAddress1: "",
        phoneNo: "",
        personType: 1
    });
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('All fields required');
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isGettingData, setIsGettingData] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>();

    useEffect(() => {
        if (requiresUpdate) {
            setIsGettingData(true);
            getPeople();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate]);

    useEffect(() => {
        setIsGettingData(false);
    }, [persons])



    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Forename", name: "forename"},
            {lable: "Surname", name: "surname"},
            {lable: "Email", name: "emailAddress1"},
            {lable: "Phone", name: "phoneNo"},
        ];

        const rows: GridRow[] =
        persons.map(person => ({columnData: person, id: person.id}));

        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: handleEditPerson,
                handleDeleteClicked: handleDeletePerson,
            };

        return gridConfig;
    };

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
                        selectedPerson.id === 0) ? "Add" :
                        "Edit: " + selectedPerson.forename}
                    icon={newIcon}>
                </LwmButton>
            )
        ];

        return options;
    };

    function getPeople() {
        if(searchString) {
            RestService.Get(`person/${searchString}`).then(
                resoponse => resoponse.json().then(
                    (data: Person[]) => setPersons(data)
                ).catch( error => console.error(error))
            );
            return;
        }

        RestService.Get('person').then(
            resoponse => resoponse.json().then(
                (data: Person[]) => setPersons(data)
            ).catch( error => console.error(error))
        );
    };

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
    };

    function handleEditPerson(person: Person) {
        setSelectedPerson(person);
        setAppletActive(true);
    };

    function handleDeletePerson(person: Person) {
        RestService.Delete(`person/${person.id}`).then(() => getPeople());
    };

    function handleLessonChange() {
        setRequiresUpdate(true);
    };

    function handleAppletCancel() {
        setAppletActive(false);
    };

    function handleAppletSave() {
        if (hasError) {
            setHasError(true);
            setError("Required fields not set");
            return;
        }

        if (selectedPerson?.id === 0) {
            RestService.Post('person', selectedPerson).then(data =>
                data.json().then(handleLessonChange)
            ).catch( error =>
                console.error(error)
            )
            return
        }

        RestService.Put('person', selectedPerson).then(
            handleLessonChange
        ).catch( error =>
            console.error(error)
        )
    }

    function handleValidationChanged(isValid: boolean) {
        setHasError(!isValid);
    };

    const handldeSearchChanged = (searchString: string) => {
        setSearchString(searchString !== '' ? searchString : undefined);
        setRequiresUpdate(true);
    }

    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="Person Center"
            moduleEntityName="Person"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            hasError={hasError}
            error={error}
            appletActive={appletActive}
            onSearchChnaged={handldeSearchChanged}
            isLoading={isGettingData}>
                <PeopleWizard
                    onChange={(person: Person) => setSelectedPerson(person)}
                    onValidationChanged={handleValidationChanged}
                    person={selectedPerson}>
                </PeopleWizard>
        </Module>
    );
};

export default PersonManager;
