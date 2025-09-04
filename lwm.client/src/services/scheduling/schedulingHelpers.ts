import {ScheduleInstance} from "../../entities/app/scheduleInstance";
import {WeekDay, Week} from "../../entities/app/schedule";
import {Schedule} from "../../entities/domainModels/schedule";

const schedulingService = () => {
    const weekDays = (): WeekDay[] => {
        return [
            {dayNumber: 1, displayName: "Monday"},
            {dayNumber: 2, displayName: "Tuesday"},
            {dayNumber: 3, displayName: "Wednesday"},
            {dayNumber: 4, displayName: "Thursday"},
            {dayNumber: 5, displayName: "Friday"},
            {dayNumber: 6, displayName: "Saturday"},
            {dayNumber: 7, displayName: "Sunday"},
        ]
    }

    const generateShedulesForWeek = (week: Week, schedules: Schedule[]):ScheduleInstance[] => {
        const builtSchedules: ScheduleInstance[] = [];

        for (const schedule of schedules) {

            // starts this week
            if (schedule.startWeek === week.weekNumber) {
                builtSchedules.push(createScheduleInstance(schedule));
                continue;
            }

            // indefinite and starts this week or has started
            if (schedule.repeat === 0 && schedule.startWeek <= week.weekNumber) {
                builtSchedules.push(createScheduleInstance(schedule));
                continue;
            }

            // repeat and start week is this week or this week is in repeat range
            if ((schedule.repeat + schedule.startWeek) > week.weekNumber && week.weekNumber >= (schedule.startWeek)) {
                builtSchedules.push(createScheduleInstance(schedule));
            }
        }

        return builtSchedules;
    }

    function createScheduleInstance(schedule: Schedule): ScheduleInstance {
        return {
            scheduledStartTime: schedule.scheduledStartTime,
            scheduledEndTime: schedule.scheduledEndTime,
            scheduledDayOfWeek: schedule.scheduledDayOfWeek,
            hourEnd: schedule.hourEnd,
            hourStart: schedule.hourStart,
            id: schedule.id,
            groupId: schedule.groupId,
            weekNumber: schedule.startWeek ?? 0,
            durationMinutes: schedule.durationMinutes,
            repeat: schedule.repeat ?? 0,
            startWeek: schedule.startWeek ?? 0,
            minuteEnd: schedule.minuteEnd,
            minuteStart: schedule.minuteStart,
            timeTableEntryId: schedule.timeTableEntryId,
        }
    }

    return({weekDays, generateShedulesForWeek});
}

export default schedulingService();