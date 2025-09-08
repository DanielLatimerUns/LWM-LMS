export type Schedule = {
    id: number;
    scheduledDayOfWeek: number;
    scheduledStartTime: string;
    scheduledEndTime: string;
    groupId?: number;
    hourStart: number;
    hourEnd: number;
    minuteStart: number;
    minuteEnd: number;
    durationMinutes: number;
    repeat: number;
    startWeek: number;
    timeTableEntryId?: number;
    title: string;
    description: string;
    isCancelled: boolean;
}