import React, {JSX, useState} from "react";
import RestService from "../../services/network/RestService";
import LwmButton from "../../framework/components/button/lwm-button";
import Module, {GridColumn, GridRow} from "../../framework/components/module/module";
import {Schedule} from "../../entities/domainModels/schedule";
import ScheduleWizard from "./applets/schedule-wizard/schedule-wizard";
import newIcon from '../../assets/new_icon.png';
import recordIcon from '../../assets/record_icon.png';
import ScheduleCalander from "./applets/schedule-calanader/schedule-calander";
import {Group} from "../../entities/domainModels/group";
import moment from "moment";
import {useQueryLwm} from "../../services/network/queryLwm.ts";

export interface Props {}

const ScheduleManager: React.FunctionComponent<Props> = () => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
    const [appletActive, setAppletActive] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isCalanaderViewActive, setIsCalanaderViewActive] = useState<boolean>(true);
    const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(moment().week());
    
    const groupsQuery = useQueryLwm<Group[]>('groups', 'group');
    const schedulesQuery = useQueryLwm<Schedule[]>('schedules', 'schedule');
    const scheduleWeekQuery =
        useQueryLwm<Schedule[]>(`weekSchedule_${currentWeekNumber}`, `schedule/${currentWeekNumber}`);

    function buildGridConfig() {

        const columns: GridColumn[] = [
            {lable: "Day", name: "scheduledDayOfWeek"},
            {lable: "Start Time", name: "scheduledStartTime"},
            {lable: "End Time", name: "scheduledEndTime"}
        ];

        const rows: GridRow[] =
        schedulesQuery.data?.map(schedule => ({columnData: schedule, id: schedule.id}) as GridRow) ?? [];

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
                    name="Week View">
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={!appletActive && !isCalanaderViewActive}
                    onClick={() => {setAppletActive(false); setIsCalanaderViewActive(false);}}
                    name="Records">
                </LwmButton>
            ),
            (
                <LwmButton
                    isSelected={appletActive}
                    onClick={() => handleAddNewSchedule(undefined)}
                    name={(!appletActive ||
                        selectedSchedule?.id === 0) ? "Add" :
                        "Edit: " + selectedSchedule?.scheduledStartTime}>
                </LwmButton>
            ),
        ];

        return options;
    }
    
    function handleSwitchView() {
        setIsCalanaderViewActive(true);
    }

    function handleAddNewSchedule(instance?: Schedule) {
        const schedule: Schedule = {
            durationMinutes: 0,
            minuteStart: 0,
            minuteEnd: 0,
            hourStart: moment().hour(),
            hourEnd: moment().hour() + 1,
            id: 0,
            scheduledStartTime: "",
            scheduledEndTime: "",
            scheduledDayOfWeek: -1,
            groupId: -1,
            repeat: 0,
            startWeek: moment().week(),
            title: "",
            description: "",
            isCancelled: false,
        };

        if (instance) {
            if(!instance?.hourEnd || !instance?.hourStart)  {return;}

            schedule.scheduledStartTime = moment().hour(instance.hourStart).format("hh:00");
            schedule.scheduledEndTime = moment().hour(instance.hourEnd).format("hh:00");
            schedule.startWeek = instance.startWeek;
            schedule.scheduledDayOfWeek = instance.scheduledDayOfWeek;
        }

        setSelectedSchedule(schedule);
        setAppletActive(true);
    }

    function handleEditSchedule(schedule: Schedule) {
        setSelectedSchedule(schedule);
        setAppletActive(true);
    }

    function handleDeleteSchedule(schedule: Schedule) {
        RestService.Delete(`schedule/${schedule.id}`).then(() => schedulesQuery.refetch());
    }

    function handleAppletCancel() {
        setError(undefined);
        setAppletActive(false);
    }

    async function handleAppletSave() {
        if (!isFormValid) {
            return;
        }

        if (selectedSchedule?.id === 0) {
            const result = await RestService.Post('schedule', selectedSchedule);
            if (!result.ok) {
                setError(await result.text());
                return;
            }
            
            await schedulesQuery.refetch();
            await scheduleWeekQuery.refetch();
            setAppletActive(false);
            setError(undefined);
            return;
        }

        const result = await RestService.Put('schedule', selectedSchedule);
        if (!result.ok) {
            setError(await result.text());
            return;
        }
        
        await schedulesQuery.refetch();
        await scheduleWeekQuery.refetch();
        setAppletActive(false);
        setError(undefined);
    }

    const calanaderView =
        <ScheduleCalander
            onWeekChanged={(weekNumber: number) => setCurrentWeekNumber(weekNumber)}
            handleScheduleClicked={handleEditSchedule}
            handleNewScheduleClicked={handleAddNewSchedule}
            groups={groupsQuery.data ?? []}/>;

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
                    groups={groupsQuery.data ?? []}
                    onChange={(schedule: Schedule) => setSelectedSchedule(schedule)}
                    onValidationChanged={(isValid: boolean) => setIsFormValid(isValid)}
                    schedule={selectedSchedule}>
            </ScheduleWizard>
        </Module>
    );
};

export default ScheduleManager;
