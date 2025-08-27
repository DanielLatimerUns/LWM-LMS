import React from 'react'
import {TimeTable, TimeTableDay, TimeTableEntry } from "../../../entities/app/timeTable";
import Moment from "moment";

export interface Props {
    timetable: TimeTable;
}

const TimeTableEditor: React.FunctionComponent<Props> = (props: Props) => {
    
    function buildTable() {
        const builtDays: JSX.Element[] = [];
        
        for (const day of props.timetable.timeTableDays) {
            builtDays.push(buildtableDay(day));
        }
        
        return (
            <div className="timetableTable">
                {builtDays}
            </div>
        );
    }
    
    function buildtableDay(timeTableDay: TimeTableDay) {
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
    
    return (
        <div>
            {buildTable()}
        </div>
    );
}

export default TimeTableEditor;