import React, {Fragment, JSX, useState} from "react";
import { Schedule } from "../../../../entities/domainModels/schedule";
import './schedule-calander.css';
import LwmButton from "../../../../framework/components/button/lwm-button";
import { Group } from "../../../../entities/domainModels/group";
import Moment from "moment";
import schedulingService from '../../../../services/scheduling/schedulingHelpers';
import { Week} from "../../../../entities/app/schedule.ts";
import {useQueryLwm} from "../../../../services/network/queryLwm.ts";

interface Props {
    handleScheduleClicked: Function;
    handleNewScheduleClicked: Function;
    groups: Group[];
    onWeekChanged: Function;
}

const ScheduleCalander: React.FunctionComponent<Props> = (props) => {
    const [currentWeekInView, setCurrentWeekInView] = useState<Week>({
        weekNumber: Moment().week(),
        displayName: `${Moment().week()}`});

    const scheduleWeekQuery = 
        useQueryLwm<Schedule[]>(`weekSchedule_${currentWeekInView.weekNumber}`, `schedule/${currentWeekInView.weekNumber}`);
    
    function handlePreviousWeekClicked() {
        props.onWeekChanged(currentWeekInView.weekNumber -1);
        setCurrentWeekInView(
            {weekNumber: currentWeekInView.weekNumber - 1, displayName: `${currentWeekInView.weekNumber - 1}`});
    }

    function handleNextWeekClicked() {
        props.onWeekChanged(currentWeekInView.weekNumber + 1);
        setCurrentWeekInView(
            {weekNumber: currentWeekInView.weekNumber + 1, displayName: `${currentWeekInView.weekNumber + 1}`});
    }
    
    function buildWeekSelection() {
        return(
            <Fragment>
                <LwmButton name="Previous Week" isSelected={false} onClick={handlePreviousWeekClicked}/>
                <div>{Moment().week(currentWeekInView.weekNumber).format("MMMM")}</div>
                <LwmButton name="Next Week" isSelected={false} onClick={handleNextWeekClicked}/>
            </Fragment>)
    }

    function buildWeekView() {
        return (
            <Fragment>
                <div className="scheduleWeekSelection">
                    {buildWeekSelection()}
                </div>
                <div className="scheduleWeekHeader">
                    {buildWeekDays()}
                </div>
                <div className="scheduleWeekContainer">
                    {buildGridCells()}
                    {buildWeekHours()}
                    {buildSchedules()}
                </div>
            </Fragment>
        )
    }
    
    function buildGridCells(){
        const cells: JSX.Element[] = [];
        
        for (let i = 1; i < 24; i++) {
            for (let j = 1; j < 9; j++) {
                 const iSCurrentWeek = Moment().week() === currentWeekInView.weekNumber;
                 const isCurrentHour = Moment().hour() === i;
                 const isCurrentDay = (j -1 == Moment().day());
                
                const cellStyle = {
                    gridColumn: j,
                    gridRow: i,
                    backgroundColor: ((isCurrentHour || isCurrentDay) && iSCurrentWeek) ? "rgb(247 242 242 / 10%)" : "none",
                };

                const schedule: Schedule = {
                    durationMinutes: 0,
                    minuteStart: 0,
                    minuteEnd: 0,
                    hourStart: i,
                    hourEnd: i + 1,
                    id: 0,
                    scheduledStartTime: "",
                    scheduledEndTime: "",
                    scheduledDayOfWeek:j -1,
                    timeTableEntryId: 0,
                    title: "",
                    description: "",
                    groupId: -1,
                    repeat: 0,
                    startWeek: currentWeekInView.weekNumber,
                    isCancelled: false,
                };
                
                cells.push(
                    <div className="cell" onClick={() => props.handleNewScheduleClicked(schedule)} style={cellStyle}>
                    </div>)
            }
        }
        
        return cells;
    }
    
    function buildWeekDays() {
        const days: JSX.Element[] = [];
        
        for (const day of schedulingService.weekDays()) {
            const isCurrentDay = (day.dayNumber == Moment().day() && currentWeekInView.weekNumber == Moment().week());

            const dayStyle = {
                gridColumn: day.dayNumber + 1,
                color: isCurrentDay ? "green" : "white",
            };

            days.push(
                <div className="scheduleWeekDay" style={dayStyle}>
                    {day.displayName} {Moment().week(currentWeekInView.weekNumber ?? 0).day(day.dayNumber).format("D")}
                </div>)
        }
        
        return days;
    }
    
    function buildWeekHours() {
        const days: JSX.Element[] = [];

        for (let i = 1; i < 24; i++) {
            const currrentHour = Moment().hour() === i;

            const dayStyle = {
                gridRow: i,
                color: currrentHour ? "green" : "white",
            };
            days.push(<div className="scheduleWeekHour" style={dayStyle}>{i}:00 {i > 12 ? "pm" : "am"}</div>)
        }

        return days;
    }
    
    function buildSchedules() {
        const schedules: JSX.Element[] = [];
        
        if (!scheduleWeekQuery.data) {
            return [];
        }
        
        for (const schedule of scheduleWeekQuery.data) {

            const isOverlapped = scheduleWeekQuery.data?.find(
                x => x.id !== schedule.id 
                    && x.scheduledDayOfWeek === schedule.scheduledDayOfWeek 
                    && (x.hourStart < schedule.hourStart && x.hourEnd > schedule.hourEnd))
            
            const startMinutes = schedule.scheduledStartTime.split(":")[1];
            const endMinutes = schedule.scheduledEndTime.split(":")[1];
            
            const height = schedule.durationMinutes;
            const startsOnHour = startMinutes === "00";
            
            const halfHalfHour = startMinutes === "30" && endMinutes === "30";
            
            let style = {
                gridColumn: schedule.scheduledDayOfWeek + 1,
                gridRowStart: schedule.hourStart,
                gridRowEnd: schedule.hourEnd + (halfHalfHour ? 1 : 0),
                zIndex: isOverlapped ? 100 : 0,
                border: schedule.isCancelled ? "red 1px solid" : isOverlapped ? "2px solid yellow" : "1px solid white",
                height: `${height}px`,
                alignSelf: halfHalfHour ? "center" : (startsOnHour ? "start" : "end"),
                background: schedule.isCancelled ? "rgb(0,0,0,20%)" : schedule.timeTableEntryId ? "green" : "#646cff",
            }
            
            const group = props.groups.find(group => group.id === schedule.groupId);
            
            schedules.push(
                <div className="schedule" style={style} onClick={() => props.handleScheduleClicked(schedule)}>
                    <div>
                        {schedule.title}{schedule.isCancelled ? " (Cancelled)" : ""}
                    </div>
                    <div>
                        {group?.name}
                    </div>
                </div>)
        }
        
        return schedules;
    }

    return (
        <div className="scheduleContainer">
            {(buildWeekView())}
        </div>);
}

export default ScheduleCalander;