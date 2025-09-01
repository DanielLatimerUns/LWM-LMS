import React, {JSX, useState} from "react";
import Module, {GridColumn, GridRow} from "../../framework/components/module/module.tsx";
import { TimeTable } from "../../entities/app/timeTable.ts";
import RestService from "../../services/network/RestService.ts";
import TimeTableWizard from "./time-table-wizard/time-table-wizard.tsx";
import LwmButton from "../../framework/components/button/lwm-button.tsx";
import {newRecordIcon} from "../../framework/icons.ts";
import TimeTableEditor from "./time-table-editor/time-table-editor.tsx";
import {useQueryLwm} from "../../services/network/queryLwm.ts";

export interface Props {}

const TimeTableManager: React.FunctionComponent<Props> = () => {
    
    const [selectedTimeTable, setSelectedTimeTable] = useState<TimeTable>();
    
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [searchString, setSearchString] = useState<string>();
    const [timetableEditorEnabled, setTimetableEditorEnabled] = useState<boolean>(false);
    
    const timetableQuery = useQueryLwm<TimeTable[]>('timetables', 'timetable');
    
    function buildGridConfig(){
        const columns: GridColumn[] = [
            {lable: "Name", name: "name"},
            {lable: "Published", name: "isPublished"},
        ]
        
        const rows: GridRow[] = 
            timetableQuery.data?.map(timeTable => ({columnData: timeTable, id: timeTable.id} as GridRow)) 
            ?? [];
        
        const timeTableEditorButton = {
            onClick: handleTimetableEditorClicked,
            name: "Manage Timetable",
            isSelected: false,
        };
        
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
                timetableId={selectedTimeTable?.id ?? 0}
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
            entries: []
        };
        
        setTimetableEditorEnabled(false);
        setError("")
        setSelectedTimeTable(timetable);
        setAppletActive(true);
    }

    function handleTimetableEditorClicked(timeTableId: number) {
        const timetable = 
            timetableQuery.data?.find(timeTable => timeTable.id === timeTableId);

        if (!timetable) {
            return;
        }

        setSelectedTimeTable(timetable);
        setTimetableEditorEnabled(true);
        setAppletActive(true);
    }
    
    function handleDelete(timetable: TimeTable) {
        RestService.Delete(`timetable/${timetable.id}`)
            .then(() => timetableQuery.refetch());
    }

    const handleSearchChanged = (searchString: string) => {
        setSearchString(searchString !== '' ? searchString : undefined);
        timetableQuery.refetch();
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
            RestService.Post('timetable', selectedTimeTable)
                .then(() => timetableQuery.refetch())
                .catch(error => {
                        console.error(error);
                        setError("Critical error");
                    }
                )
            return;
        }

        RestService.Put('timetable', selectedTimeTable)
            .then(() => timetableQuery.refetch())
            .catch(error => {
                    console.error(error);
                    setError("Critical error");
                }
            )
    }
    
    return (
        <Module
            moduleName={'Time Table Manager'}
            moduleEntityName={'TimeTable'}
            gridConfig={buildGridConfig()}
            isLoading={timetableQuery.isPending}
            options={buildActionOptions()}
            error={error}
            onSearchChnaged={handleSearchChanged}
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={timetableEditorEnabled ? undefined : handleAppletSave}
            appletActive={appletActive}
            fullWidthApplet={timetableEditorEnabled}
            children={buildApplet()}>
        </Module>
    );
};

export default TimeTableManager;