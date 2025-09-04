export type ScheduleInstance = {
    id: number;
    scheduledDayOfWeek: number;
    scheduledStartTime: string;
    scheduledEndTime: string;
    groupId?: number;
    hourStart: number;
    hourEnd: number;
    weekNumber: number;
    durationMinutes?: number;
    repeat: number;
    startWeek: number;
    minuteStart: number;
    minuteEnd: number;
    timeTableEntryId?: number;
}