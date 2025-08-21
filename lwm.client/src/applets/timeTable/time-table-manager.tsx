import React, { useEffect, useState } from "react";
import Module from "../../framework/components/module/module.tsx";
import TimeTable from "../../entities/app/timeTable.ts";
import RestService from "../../services/network/RestService.ts";
import GridColumn from "../../entities/framework/gridColumn.ts";

export interface Props {}

const TimeTableManager: React.FunctionComponent<Props> = () => {
    const [timeTables, setTimeTable] = useState<TimeTable[]>([]);
    
    useEffect(() => {
        getTimetables();
    })
    
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
        
        const rows = 
            timeTables.map(timeTable => ({columnData: timeTable, id: timeTable.id}));
        
        return  {
            columns: columns,
            rows: rows,
        }
    }
    
    return (
        <Module
            moduleName={'Time Table Manager'}
            moduleEntityName={'TimeTable'}
            gridConfig={buildGridConfig()}
            isLoading={false}
            options={[]}
            hasError={false}
            appletActive={false}>
        </Module>
    );
};

export default TimeTableManager;