export default interface ScheduleInstance {
    id: number;
    schedualedDayOfWeek: number;
    schedualedStartTime: string;
    schedualedEndTime: string;
    groupId?: number;
    hourStart: number;
    hourEnd: number;
    weekNumber: number;
    durationMinutes?: number;
    repeat: number;
    startWeek: number;
    minuteStart: number;
    minuteEnd: number;
}