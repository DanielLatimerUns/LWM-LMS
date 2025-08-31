export type TimeTable = {
    id: number,
    name: string,
    isPublished: boolean,
    entries: TimeTableEntry[],
}

export type TimeTableEntry = {
    id: number;
    timeTableId: number;
    groupId: number;
    groupName: string;
    startTime: string;
    endTime: string;
    teacherId: number;
    dayNumber: number;
}

export function getTimetableDayName(dayOfWeekId: number) {
    switch (dayOfWeekId) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return 'NA';
    }
}