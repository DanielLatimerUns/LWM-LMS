import React, { useEffect, useState } from "react";
import Module, {GridColumn, GridRow} from "../../framework/components/module/module.tsx";
import { TimeTable } from "../../entities/app/timeTable.ts";
import RestService from "../../services/network/RestService.ts";
import TimeTableWizard from "./time-table-wizard/time-table-wizard.tsx";
import LwmButton from "../../framework/components/button/lwm-button.tsx";
import {newRecordIcon} from "../../framework/icons.ts";
import TimeTableEditor from "./time-table-editor/time-table-editor.tsx";

export interface Props {}

const TimeTableManager: React.FunctionComponent<Props> = () => {
    const [timeTables, setTimeTable] = useState<TimeTable[]>([]);
    const [selectedTimeTable, setSelectedTimeTable] = useState<TimeTable>();
    
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isGettingData, setIsGettingData] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>();
    const [timetableEditorEnabled, setTimetableEditorEnabled] = useState<boolean>(false);
    
    useEffect(() => {
        if (requiresUpdate) {
            setIsGettingData(true);
            getTimetables();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate]);

    useEffect(() => {
        setIsGettingData(false);
    }, [timeTables])

    function getTimetables() {
        RestService.Get('timetable').then(
            response => response.json().then(
                (data: TimeTable[]) => setTimeTable(data)
            ).catch(error => console.error(error))
        )
    }
    
    function buildGridConfig(){
        const columns: GridColumn[] = [
            {lable: "Name", name: "name"},
            {lable: "Published", name: "isPublished"},
        ]
        
        const rows: GridRow[] = 
            timeTables.map(timeTable => ({columnData: timeTable, id: timeTable.id} as GridRow));
        
        const timeTableEditorButton = new LwmButton({
            onClick: handleTimetableEditorClicked,
            name: "Manage Timetable",
            isSelected: false,
        })
        
        return {
            columns: columns,
            rows: rows,
            handleEditClicked: handleEdit,
            handleDeleteClicked: handleDelete,
            customButtons: [timeTableEditorButton]
        }
    }

    function buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton
                    isSelected={!appletActive}
                    onClick={() => {
                        setAppletActive(false);
                    }}
                    name="Timtables"
                    icon={newRecordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={handleAdd}
                    name={(!appletActive ||
                        selectedTimeTable?.id === 0) ? "Add" :
                        "Edit: " + selectedTimeTable?.name}
                    icon={newRecordIcon}>
                </LwmButton>
            )
        ];

        return options;
    }
    
    function buildApplet() {
        if (timetableEditorEnabled) {
            return buildTimeTableEditor();
        }
        return buildWizard();
    }
    
    function buildTimeTableEditor() {
        return (
            <TimeTableEditor
                timetable={selectedTimeTable}
            ></TimeTableEditor>
        );
    }
    
    function buildWizard() {
        return (
            <TimeTableWizard
            onChanged={(timetable: TimeTable) => setSelectedTimeTable(timetable)}
            timeTable={selectedTimeTable}
            onValidationChanged={(isValid: boolean) => setError(isValid ? undefined : "Required fields not set")}>
        </TimeTableWizard>);
    }

    function handleEdit(timetable: TimeTable) {
        setTimetableEditorEnabled(false);
        setSelectedTimeTable(timetable);
        setAppletActive(true);
    }

    function handleAdd() {
        const timetable: TimeTable = {
            name: "",
            isPublished: false,
            id: 0,
            days: []
        };
        
        setTimetableEditorEnabled(false);
        setError("")
        setSelectedTimeTable(timetable);
        setAppletActive(true);
    }

    function handleTimetableEditorClicked(timeTableId: number) {
        const timetable = timeTables.find(timeTable => timeTable.id === timeTableId);

        if (!timetable) {
            return;
        }

        setSelectedTimeTable(timetable);
        setTimetableEditorEnabled(true);
        setAppletActive(true);
    }


    function handleDelete(timetable: TimeTable) {
        RestService.Delete(`timetable/${timetable.id}`).then(() => getTimetables());
    }

    const handleSearchChanged = (searchString: string) => {
        setSearchString(searchString !== '' ? searchString : undefined);
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

        if (selectedTimeTable?.id === 0) {
            RestService.Post('timetable', selectedTimeTable).then(handleDataChange)
                .catch(error => {
                        console.error(error);
                        setError("Critical error");
                    }
                )
            return;
        }

        RestService.Put('timetable', selectedTimeTable).then(handleDataChange)
            .catch(error => {
                    console.error(error);
                    setError("Critical error");
                }
            )
    }

    function handleDataChange(response: Response) {
        if (!response.ok) {
            setError(response.statusText);
            return;
        }
        setRequiresUpdate(true);
    }
    
    return (
        <Module
            moduleName={'Time Table Manager'}
            moduleEntityName={'TimeTable'}
            gridConfig={buildGridConfig()}
            isLoading={isGettingData}
            options={buildActionOptions()}
            error={error}
            onSearchChnaged={handleSearchChanged}
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            appletActive={appletActive}
            fullWidthApplet={timetableEditorEnabled}
            children={buildApplet()}>
        </Module>
    );
};

export default TimeTableManager;