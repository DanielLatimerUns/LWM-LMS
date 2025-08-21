export default interface TimeTable {
    id: number,
    name: string,
    isPublished: boolean,
    timeTableDays: TimeTableDay[],
    
}

export interface TimeTableDay {
    dayOfWeek: number,
    timeTableId: number,
    timeTableEntries: TimeTableEntry[]
}

export interface TimeTableEntry {
    id: number;
    timeTableDayId: number;
    timeTableId: number;
    groupId: number;
    startTime: Date;
    endTime: Date;
}
