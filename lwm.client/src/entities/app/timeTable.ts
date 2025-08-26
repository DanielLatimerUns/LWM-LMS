export type TimeTable = {
    id: number,
    name: string,
    isPublished: boolean,
    timeTableDays: TimeTableDay[],
    
}

export type TimeTableDay = {
    dayOfWeek: number,
    timeTableId: number,
    timeTableEntries: TimeTableEntry[]
}

export type TimeTableEntry = {
    id: number;
    timeTableDayId: number;
    timeTableId: number;
    groupId: number;
    startTime: Date;
    endTime: Date;
}
