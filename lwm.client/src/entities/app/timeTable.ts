export type TimeTable = {
    id: number,
    name: string,
    isPublished: boolean,
    days: TimeTableDay[],
    
}

export type TimeTableDay = {
    dayOfWeek: number,
    dayOfWeekName: string,
    timeTableId: number,
    timeTableEntries: TimeTableEntry[]
}

export type TimeTableEntry = {
    id: number;
    timeTableDayId: number;
    timeTableId: number;
    groupId: number;
    groupName: string;
    startTime: Date;
    endTime: Date;
}