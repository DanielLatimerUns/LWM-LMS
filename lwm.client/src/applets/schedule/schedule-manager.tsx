import React, {JSX, useEffect, useState} from "react";
import RestService from "../../services/network/RestService";
import LwmButton from "../../framework/components/button/lwm-button";
import Module, { GridColumn, GridRow } from "../../framework/components/module/module";
import {Schedule} from "../../entities/domainModels/schedule";
import ScheduleWizard from "./applets/schedule-wizard/schedule-wizard";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import ScheduleCalander from "./applets/schedule-calanader/schedule-calander";
import {Group} from "../../entities/domainModels/group";
import moment from "moment";
import {ScheduleInstance} from "../../entities/app/scheduleInstance";

export interface Props {}

const ScheduleManager: React.FunctionComponent<Props> = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({
        durationMinutes: 0,
        minuteStart: 0,
        minuteEnd: 0,
        hourStart: moment().hour(),
        hourEnd: moment().hour() + 1,
        id: 0,
        schedualedStartTime: "",
        schedualedEndTime: "",
        schedualedDayOfWeek: -1,
        groupId: -1,
        repeat: 0,
        startWeek: moment().week()});

    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>('All fields required');
    const [requiresUpdate, setRequiresUpdate] = useState<boolean>(true);
    const [isCalanaderViewActive, setIsCalanaderViewActive] = useState<boolean>(true);
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        if (requiresUpdate) {
            getSchedules();
            getGroups();
            setAppletActive(false);
            setRequiresUpdate(false);
        }
    }, [requiresUpdate])

    function buildGridConfig() {
        const columns: GridColumn[] = [
            {lable: "Day", name: "scheduledDayOfWeek"},
            {lable: "Start Time", name: "scheduledStartTime"},
            {lable: "End Time", name: "scheduledEndTime"}
        ];

        const rows: GridRow[] =
        schedules.map(schedule => ({columnData: schedule, id: schedule.id}));

        const gridConfig = {
                columns: columns,
                rows: rows,
                handleEditClicked: handleEditSchedule,
                handleDeleteClicked: handleDeleteSchedule,
            };

        return gridConfig;
    }

    function buildActionOptions() {
        const options: JSX.Element[] = [
            (
                <LwmButton
                    isSelected={isCalanaderViewActive}
                    onClick={handleSwitchView}
                    name="Week View"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={!appletActive && !isCalanaderViewActive}
                    onClick={() => {setAppletActive(false); setIsCalanaderViewActive(false);}}
                    name="Records"
                    icon={recordIcon}>
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={() => handleAddNewSchedule(undefined)}
                    name={(!appletActive ||
                        selectedSchedule?.id === 0) ? "Add" :
                        "Edit: " + selectedSchedule?.schedualedStartTime}
                    icon={newIcon}>
                </LwmButton>
            ),
        ];

        return options;
    }

    function getSchedules() {
        RestService.Get('lessonschedule').then(
            resoponse => resoponse.json().then(
                (data: Schedule[]) => setSchedules(data)
            ).catch(error => console.error(error))
        );
    }

    function getGroups() {
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => setGroups(data)
            ).catch( error => console.error(error))
        );
    }

    function handleSwitchView() {
        setIsCalanaderViewActive(true);
    }

    function handleAddNewSchedule(instance?: ScheduleInstance) {
        const schedule: Schedule = {
            durationMinutes: 0,
            minuteStart: 0,
            minuteEnd: 0,
            hourStart: moment().hour(),
            hourEnd: moment().hour() + 1,
            id: 0,
            schedualedStartTime: "",
            schedualedEndTime: "",
            schedualedDayOfWeek: -1,
            groupId: -1,
            repeat: 0,
            startWeek: moment().week()
        };

        if (instance) {
            if(!instance?.hourEnd || !instance?.hourStart)  {return;}

            schedule.schedualedStartTime = moment().hour(instance.hourStart).format("hh:00");
            schedule.schedualedEndTime = moment().hour(instance.hourEnd).format("hh:00");
            schedule.startWeek = instance.weekNumber;
            schedule.schedualedDayOfWeek = instance.scheduledDayOfWeek;
        }

        setSelectedSchedule(schedule);
        setAppletActive(true);
    }

    function handleEditSchedule(schedule: Schedule) {
        setSelectedSchedule(schedule);
        setAppletActive(true);
    }

    function handleDeleteSchedule(schedule: Schedule) {
        RestService.Delete(`schedule/${schedule.id}`).then(() => getSchedules());
    }

    function handleDataChange(response: Response) {
        if (!response.ok) {
            setError(response.statusText);
            return;
        }
        setRequiresUpdate(true);
    }

    function handleAppletCancel() {
        setError(undefined);
        setAppletActive(false);
    }

    function handleAppletSave() {
        if (error) {
            return;
        }

        if (selectedSchedule?.id === 0) {
            RestService.Post('schedule', selectedSchedule).then(handleDataChange).catch(
                error => console.error(error)
            )
            return;
        }

        RestService.Put('schedule', selectedSchedule).then(handleDataChange).catch(
            error => console.error(error)
        );
    }

    const calanaderView =
        <ScheduleCalander
            handleScheduleClicked={handleEditSchedule}
            handleNewScheduleClicked={handleAddNewSchedule}
            groups={groups}
            schedules={schedules}/>;

    return (
        <Module
            gridConfig={buildGridConfig()}
            moduleName="Schedule Center"
            moduleEntityName="Schedule"
            handleCloseClicked={handleAppletCancel}
            handleSaveCloseClicked={handleAppletSave}
            options={buildActionOptions()}
            error={error}
            appletActive={appletActive}
            altView={isCalanaderViewActive ? calanaderView : undefined}
            isLoading={false}>
            <ScheduleWizard
                    groups={groups}
                    onChange={(schedule: Schedule) => setSelectedSchedule(schedule)}
                    onValidationChanged={(isValid: boolean) => setError(isValid ? undefined : "Required fields not set")}
                    schedule={selectedSchedule}>
            </ScheduleWizard>
        </Module>
    );
};

export default ScheduleManager;
