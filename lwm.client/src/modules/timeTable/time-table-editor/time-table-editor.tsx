import React, {JSX, useState} from 'react'
import './time-table-editor.css';
import {TimeTable, TimeTableEntry, getTimetableDayName } from "../../../entities/app/timeTable";
import LwmButton from "../../../framework/components/button/lwm-button.tsx";
import TimeTableEditorEntry from "./time-table-editor-add-entry/time-table-editor-entry.tsx";
import RestService from "../../../services/network/RestService.ts";
import {Group} from "../../../entities/domainModels/group.ts";
import {Teacher} from "../../../entities/domainModels/teacher.ts";
import {useQueryLwm} from "../../../services/network/queryLwm.ts";
import Loading from "../../../framework/components/loading/loading.tsx";

export interface Props {
    timetableId: number;
}

const TimeTableEditor: React.FunctionComponent<Props> = (props: Props) => {
    const [selectedEntry, setSelectedEntry] = useState<TimeTableEntry>();
    
    const groupQuery = 
        useQueryLwm<Group[]>('group','group');
    const teachersQuery = 
        useQueryLwm<Teacher[]>('teacher','teacher');
    const timetableQuery = 
        useQueryLwm<TimeTable>('timetable', `timetable/${props.timetableId}`);
    
    function buildTable() {
        if (!timetableQuery.data) {
            return;
        }
        
        const builtDays: JSX.Element[] = [];
        
        for (let day = 1; day <= 7; day++) {
            builtDays.push(buildDay(day));
        }
        
        return (
            <div className="timetableTable">
                {builtDays}
            </div>
        );
    }
    
    function buildDay(dayNumber: number) {
        return (
            <div className="timetableTableDay">
                <div className="timetableTableDayHeader">
                    {getTimetableDayName(dayNumber)}
                </div>
                <div className="timetableTableDayEnties">
                    {buildTableEntries(dayNumber)}
                    {buildAddEntryButton(dayNumber)}
                </div>
            </div>
        );
    }
    
    function buildEntrySection() {
        if (!selectedEntry || !timetableQuery.data) {
            return;
        }
        
        return (
            <TimeTableEditorEntry groups={groupQuery.data ?? []}
                                  teachers={teachersQuery.data ?? []}
                                  timetable={timetableQuery.data}
                                  timetableEntry={selectedEntry}
                                  onValidationChanged={() => {}}
                                  onSave={handleEntrySave}
                                  onChange={handEntryChanged}
                                  onClose={handleEntryClose}
                                  onDelete={handleEntryDelete}/>
        )
    }
    
    function buildTableEntries(dayNumber: number) {
        const builtEntries: JSX.Element[] = [];
        
        if (!timetableQuery.data) {
            return ;
        }
        
        timetableQuery.data.entries.filter(x => x.dayNumber === dayNumber).forEach(timeTableEntry => {
            builtEntries.push(
                <div className={selectedEntry === timeTableEntry ? "timetableTableEntrySelected" : "timetableTableEntry"} onClick={() => setSelectedEntry(timeTableEntry)}>
                    <div className={ "timetableTableEntryHeader"}>
                        {groupQuery.data?.find(x => x.id === timeTableEntry.groupId)?.name}
                    </div>
                    <div className="timetableTableEntryBody">
                        {timeTableEntry.startTime} - {timeTableEntry.endTime}
                    </div>
                </div>
            )
        })
        
        return builtEntries;
    }
    
    function buildAddEntryButton(dayNumber: number) {
        return (
            <div className="timetableTableToolbar">
                <LwmButton onClick={() => handleEntryClicked(dayNumber)} buttonType={"add"} isSelected={false} name="Add new entry"></LwmButton>
            </div>
        )
    }
    
    function handleEntryClicked(dayNumber: number) {
        setSelectedEntry({
            timeTableId: timetableQuery.data?.id ?? 0,
            startTime: "",
            endTime: "",
            groupId: -1,
            dayNumber: dayNumber,
            id: 0,
            groupName: "",
            teacherId: 0
        })
    }
    
    function handEntryChanged(entry: TimeTableEntry) {
        setSelectedEntry(entry);
    }
    
    function handleEntryClose() {
        setSelectedEntry(undefined);
    }
    
    function handleEntrySave() {
        if (!selectedEntry) {
            return;
        }
        
        if (selectedEntry.id === 0) {
            RestService.Post('timetable/entry', selectedEntry).then(
                response => {
                    if (!response.ok) {
                        return;
                    }
                    timetableQuery.refetch();
                    handleEntryClicked(selectedEntry.dayNumber);
                }
            ).catch(error => {
                console.error(error)
            });
            return;
        }
        
        RestService.Put('timetable/entry', selectedEntry).then(
            response => {
                if (!response.ok) {
                    return;
                }
                timetableQuery.refetch();
            }
        ).catch(error => console.error(error));
        
        setSelectedEntry(undefined);
    }
    
    async function handleEntryDelete() {
        if (!selectedEntry) {
            return;
        }
        
        const response = await RestService.Delete(`timetable/entry/${selectedEntry.id}`);
        if (!response.ok) {
            console.log(await response.text());
        }
            
        await timetableQuery.refetch();
    }

    return (
        <div className="timetableTableContainer">
            <div className="timetableTableEntrySection">
                {buildEntrySection()}
            </div>
            <div className="timetableTableSection">
                {buildTable()}
            </div>
            <Loading isVisible={timetableQuery.isPending}></Loading>
        </div>
    );
}

export default TimeTableEditor;