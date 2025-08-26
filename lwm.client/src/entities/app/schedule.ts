export type Week = {
    weekNumber: number;
    displayName: string;
}

export type WeekDay = {
    dayNumber: number;
    displayName: string;
    week?: Week;
}