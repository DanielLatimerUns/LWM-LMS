import React, { useEffect, useState } from "react";
import RestService from "../../services/network/RestService";
import LwmButton from "../../framework/components/button/lwm-button";
import Module from "../../framework/components/module/module";
import GridColumn from "../../entities/framework/gridColumn";
import GridRow from "../../entities/framework/gridRow";
import Schedule from "../../entities/domainModels/schedule";
import ScheduleWizard from "./applets/schedule-wizard/schedule-wizard";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import ScheduleCalander from "./applets/schedule-calanader/schedule-calander";
import Group from "../../entities/domainModels/group";
import moment from "moment";
import ScheduleInstance from "../../entities/app/scheduleInstance";

export interface Props {};

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
    const [hasError, setHasError] = useState<boolean>(false);
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
            {lable: "Day", name: "schedualedDayOfWeek"},
            {lable: "Start Time", name: "schedualedStartTime"},
            {lable: "End Time", name: "schedualedEndTime"}
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
    };

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
    };

    function getSchedules() {
        RestService.Get('lessonschedule').then(
            resoponse => resoponse.json().then(
                (data: Schedule[]) => setSchedules(data)
            ).catch(error => console.error(error))
        );
    };

    function getGroups() {
        RestService.Get('group').then(
            resoponse => resoponse.json().then(
                (data: Group[]) => setGroups(data)
            ).catch( error => console.error(error))
        );
    };

    function handleSwitchView() {
        setIsCalanaderViewActive(true);
    };

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
            schedule.schedualedDayOfWeek = instance.schedualedDayOfWeek;
        }

        setSelectedSchedule(schedule);
        setAppletActive(true);
    };

    function handleEditSchedule(schedule: Schedule) {
        setSelectedSchedule(schedule);
        setAppletActive(true);
    };

    function handleDeleteSchedule(schedule: Schedule) {
        RestService.Delete(`lessonschedule/${schedule.id}`).then(() => getSchedules());
    };

    function handleLessonChange() {
        setRequiresUpdate(true);
    };

    function handleAppletCancel() {
        setHasError(false);
        setAppletActive(false);
    };

    function handleAppletSave() {
        if (hasError) {
            setHasError(true);
            setError("Required fields not set");
            return;
        }

        if (selectedSchedule?.id === 0) {
            RestService.Post('lessonschedule', selectedSchedule).then(data =>
                {
                    if (data.ok) {
                        data.json().then(handleLessonChange);
                    } else {
                        data.text().then((response) => handleValidationChanged(false, response));
                    }
                },
                error => handleValidationChanged(true, error.message)
            )
            return;
        }

        RestService.Put('lessonschedule', selectedSchedule).then( data => {
                if (data.ok) {
                    handleLessonChange();
                } else {
                    data.text().then((response) => handleValidationChanged(false,  response));
                }
            },
            error => handleValidationChanged(true, error.message)
        );
    };

    function handleValidationChanged(isValid: boolean, error: string ) {
        setHasError(!isValid);
        setError(error);
    };

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
            hasError={hasError}
            appletActive={appletActive}
            altView={isCalanaderViewActive ? calanaderView : undefined}>
            <ScheduleWizard
                    groups={groups}
                    onChange={(schedule: Schedule) => setSelectedSchedule(schedule)}
                    onValidationChanged={handleValidationChanged}
                    schedule={selectedSchedule}>
                </ScheduleWizard>
        </Module>
    );
};

export default ScheduleManager;
