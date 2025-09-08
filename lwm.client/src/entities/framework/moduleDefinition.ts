import LessonFeed from "../../modules/lesson-feed/lesson-feed.tsx";
import {
    controlCenterIcon,
    groupIcon,
    lessonIcon,
    peopleIcon,
    scheduleIcon,
    timetableIcon
} from "../../framework/icons.ts";
import LessonManager from "../../modules/lesson/lesson-manager.tsx";
import PersonManager from "../../modules/people/people-manager.tsx";
import GroupManager from "../../modules/group/group-manager.tsx";
import ScheduleManager from "../../modules/schedule/schedule-manager.tsx";
import TimeTableManager from "../../modules/timeTable/time-table-manager.tsx";
import ControlCenter from "../../modules/controlCenter/control-center.tsx";

export type ModuleDefinition = {
    name: string;
    module: typeof LessonFeed | typeof LessonManager | typeof PersonManager | 
        typeof GroupManager | typeof ScheduleManager | typeof TimeTableManager | typeof ControlCenter;
    active: boolean;
    icon: string;
    navLink: string;
    isDefault?: boolean;
}

export function GetModules() : ModuleDefinition[] {
    return  [
        {
            name: 'Schedule',
            active: false,
            icon: scheduleIcon,
            module: ScheduleManager,
            navLink: 'scheduling',
            isDefault: true
        },
        {
            name: 'People',
            active: false,
            icon: peopleIcon,
            module: PersonManager,
            navLink: 'people'
        },
        {
            name: 'Groups',
            active: false,
            icon: groupIcon,
            module: GroupManager,
            navLink: 'groups'
        },
        {
            name: 'Timetables',
            active: false,
            icon: timetableIcon,
            module: TimeTableManager,
            navLink: 'timetables'
        },
        {
            name: 'Lessons',
            active: false,
            icon: lessonIcon,
            module: LessonManager,
            navLink: 'lessons'
        },
        {
            name: 'Control Center',
            active: false,
            icon: controlCenterIcon,
            module: ControlCenter,
            navLink: 'controlcenter'
        }
    ];
}