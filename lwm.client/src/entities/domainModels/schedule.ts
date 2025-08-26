export type Schedule = {
    id: number;
    schedualedDayOfWeek: number;
    schedualedStartTime: string;
    schedualedEndTime: string;
    groupId?: number;
    hourStart: number;
    hourEnd: number;
    minuteStart: number;
    minuteEnd: number;
    durationMinutes: number;
    repeat?: number;
    startWeek?: number;
}