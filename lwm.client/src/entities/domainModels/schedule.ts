export default interface Schedule {
    id: number;
    schedualedDayOfWeek?: number;
    schedualedStartTime?: string;
    schedualedEndTime?: string;
    groupId?: number;
}