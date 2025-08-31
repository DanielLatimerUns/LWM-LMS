import React, {Fragment, JSX, useState} from "react";
import { Schedule } from "../../../../entities/domainModels/schedule";
import './schedule-calander.css';
import LwmButton from "../../../../framework/components/button/lwm-button";
import { Group } from "../../../../entities/domainModels/group";
import { ScheduleInstance } from "../../../../entities/app/scheduleInstance";
import Moment from "moment";
import schedulingService from '../../../../services/scheduling/schedulingHelpers';
import { Week, WeekDay} from "../../../../entities/app/schedule.ts";

interface Props {
    schedules: Schedule[];
    handleScheduleClicked: Function;
    handleNewScheduleClicked: Function;
    groups: Group[];
}

const ScheduleCalander: React.FunctionComponent<Props> = (props) => {
    const [currentWeekInView, setCurrentWeekInView] = useState<Week>({
        weekNumber: Moment().week(),
        displayName: `${Moment().week()}`});


    function handlePreviousWeekClicked() {
        setCurrentWeekInView(
            {weekNumber: currentWeekInView.weekNumber - 1, displayName: `${currentWeekInView.weekNumber - 1}`});
    }

    function handleNextWeekClicked() {
        setCurrentWeekInView(
            {weekNumber: currentWeekInView.weekNumber + 1, displayName: `${currentWeekInView.weekNumber + 1}`});
    }

    function handleCurrentWeekClicked() {
        setCurrentWeekInView({weekNumber: Moment().week(), displayName: `${Moment().week()}`});
    }

    function renderCalanaderView() {
        return (
            <Fragment>
                <div className="scheduleCalanderWeekSelection">
                    {buildWeekSelection()}
                </div>
                <div className="scheduleCalanderWeekContainer">
                    {buildWeek(currentWeekInView)}
                </div>
            </Fragment>
        )
    }

    function buildWeekSelection() {
        return(
            <Fragment>
                <LwmButton name="< Previous Week" isSelected={false} onClick={handlePreviousWeekClicked}/>
                <LwmButton name="Current Week" isSelected={false} onClick={handleCurrentWeekClicked}/>
                <LwmButton name="Next Week >" isSelected={false} onClick={handleNextWeekClicked}/>
            </Fragment>)
    }

    function buildWeek(week: Week) {
        const builtDays: JSX.Element[] = [];

        for(const day of schedulingService.weekDays()) {
            day.week = week
            builtDays.push(buildDay(day));
        }

        return builtDays;
    }

    function buildDay(weekday: WeekDay) {
        if(!weekday.week) {
            return <div></div>;
        }

        const isCurrentDay = (weekday.dayNumber == Moment().day() && weekday.week?.weekNumber == Moment().week());

        return (
            <div className="scheduleCalanderDayContainer">
                <div className="scheduleCalanderDayHeader">
                    {weekday.displayName} {Moment().week(weekday.week?.weekNumber).day(weekday.dayNumber).format("DD")}
                </div>
                <div className={isCurrentDay ? "scheduleCalanderDayHours currentDay" : "scheduleCalanderDayHours"}>
                    {buildDayHours(weekday)}
                </div>
            </div>
        )
    }

    function buildDayHours(weekday: WeekDay) {
        const builtHours: JSX.Element[] = [];

        if (!weekday.week) {return;}

        const daySchedules = schedulingService.generateShedulesForWeek(
            weekday.week, props.schedules).filter(
                x => x.schedualedDayOfWeek === weekday.dayNumber);

        for (let i = 5; i < 24; i++ ) {
            builtHours.push((
                <div className="scheduleCalanderHourContainer">
                    <div className="scheduleCalanderHourHeaderContainer">
                        {<div className="scheduleCalanderHoursHeader">{i > 9 ? i : "0"+i}:00</div>}
                    </div>
                    <div className="scheduleCalanderHoursScheduleContainer">
                        <div className="scheduleCalanderHours">
                            {buildHour(daySchedules, i, weekday)}
                        </div>
                    </div>
                </div>
            ))
        }

        return builtHours;
    }

    function buildHour(schedules: ScheduleInstance[], hour: number, weekday: WeekDay) {
        const hourSchedules =
            schedules
                .filter(x => x.hourStart <= hour && x.hourEnd >= hour )
                    .sort((a, b) => Number(new Date(b.scheduledStartTime)) - Number(new Date(a.scheduledStartTime)))

        const newSchedule: ScheduleInstance = {
            minuteStart: 0,
            minuteEnd: 0,
            hourStart: hour,
            hourEnd: hour + 1,
            scheduledDayOfWeek: weekday.dayNumber,
            weekNumber: weekday.week?.weekNumber ? weekday.week?.weekNumber : 0,
            id:0,
            scheduledEndTime: "",
            scheduledStartTime: "",
            startWeek: weekday.week?.weekNumber ? weekday.week?.weekNumber : 0,
            repeat: 0
        };

        if (hourSchedules.length === 0) {
            return <LwmButton isSelected={false} onClick={() => props.handleNewScheduleClicked(newSchedule)}>
                        <div className="scheduleCalanderScheduleAdd">Add Schedule</div>
                    </LwmButton>;
        }

        return (
            hourSchedules.map(x => buildScheduleEntry(x, hour))
        );
    }

    function buildScheduleEntry(schedule: ScheduleInstance, hour: number) {
        const group = props.groups.find(x => x.id === schedule.groupId);

        if (!schedule.hourStart || !schedule.durationMinutes) {
            return;
        }

        let durationInHour: number = 0;

        if (schedule.hourStart === hour) {
            durationInHour =
            (schedule.durationMinutes - schedule.minuteStart) > 60 ? 60 - schedule.minuteStart : schedule.durationMinutes - schedule.minuteStart;
        }

        if (hour > schedule.hourStart) {
            let hourSplit = hour - schedule.hourStart;
            durationInHour = schedule.durationMinutes - ((60 * hourSplit) - schedule.minuteStart);

            durationInHour = durationInHour > 60 ? 60 : durationInHour;
        }

        const percentDuration = (durationInHour - 1 ) / (60 - 1 ) * 100;

        const divStyle = {
                width: `${percentDuration}%`
              };

        return (
            <Fragment>
                <div className="scheduleCalanderScheduleEntryDuration" style={divStyle}>
                <LwmButton isSelected={false} onClick={() => props.handleScheduleClicked(schedule)}>
                    <div className="scheduleCalanderScheduleEntry">
                        {group ? group.name : "no group"} {schedule.scheduledDayOfWeek} - {schedule.scheduledEndTime}
                    </div>
                </LwmButton>
                </div>
            </Fragment>);
    }

    return (
        <div className="scheduleCalanderContainer">
            {renderCalanaderView()}
        </div>);
}

export default ScheduleCalander;