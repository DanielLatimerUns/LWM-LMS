import React, {useEffect, useState } from 'react'
import './time-table-editor.css';
import {TimeTable, TimeTableDay, TimeTableEntry } from "../../../entities/app/timeTable";
import Moment from "moment";
import LwmButton from "../../../framework/components/button/lwm-button.tsx";
import TimeTableEditorEntry from "./time-table-editor-add-entry/time-table-editor-entry.tsx";
import RestService from "../../../services/network/RestService.ts";
import {Group} from "../../../entities/domainModels/group.ts";

export interface Props {
    timetable?: TimeTable;
}

const TimeTableEditor: React.FunctionComponent<Props> = (props: Props) => {

    const [groups, setGroups] = useState<Group[]>([]);
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [selectedEntry, setSelectedEntry] = useState<TimeTableEntry>();

    useEffect(() => {
        if (requiresUpdate) {
            getGroups();
            setRequiresUpdate(false);
        }
    }, [requiresUpdate])
    
    function buildTable() {
        if (!props.timetable) {
            return;
        }
        
        const builtDays: JSX.Element[] = [];
        
        for (const day of props.timetable.days) {
            builtDays.push(buildDay(day));
        }
        
        return (
            <div className="timetableTable">
                {builtDays}
            </div>
        );
    }
    
    function buildDay(timeTableDay: TimeTableDay) {
        return (
            <div className="timetableTableDay">
                <div className="timetableTableDayHeader">
                    {timeTableDay.dayOfWeekName}
                </div>
                <div className="timetableTableDayEnties">
                    {buildTableEntries(timeTableDay.timeTableEntries)}
                </div>
            </div>
        );
    }
    
    function buildEntrySection() {
        if (!selectedEntry) {
            return;
        }
        
        return (     
            <TimeTableEditorEntry groups={groups}
                                  timetable={props.timetable}
                                  timetableEntry={selectedEntry}
                                  onValidationChanged={() => {}}
                                  onChange={() => {}}
                                  
            />)
    }
    
    function buildTableEntries(timeTableEntries: TimeTableEntry[]) {
        const builtEntries: JSX.Element[] = [];
        
        timeTableEntries.forEach(timeTableEntry => {
            builtEntries.push(
                <div className="timetableTableEntry">
                    <div className={ "timetableTableEntryHeader"}>
                        {timeTableEntry.groupName}
                    </div>
                    <div className="timetableTableEntryBody">
                        {Moment(timeTableEntry.startTime).format("HH:mm")} - {Moment(timeTableEntry.endTime).format("HH:mm")}
                    </div>
                </div>
            )
        })
        
        return builtEntries;
    }
    
    function handleEntryClicked() {
        setSelectedEntry({
            timeTableId: props.timetable?.id ?? 0,
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now()),
            groupId: -1,
            timeTableDayId: 0,
            id: 0,
            groupName: ""
        })
    }

    function getGroups() {
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => setGroups(data)
            ).catch( error => console.error(error))
        );
    }
    
    return (
        <div className="timetableTableContainer">
            <div className="timetableTableToolbar">
                <LwmButton onClick={handleEntryClicked} isSelected={false} name="Add entry"></LwmButton>
            </div>
            <div className="timetableTableEntrySection">
                {buildEntrySection()}
            </div>
            <div className="timetableTableSection">
                {buildTable()}
            </div>
        </div>
    );
}

export default TimeTableEditor;