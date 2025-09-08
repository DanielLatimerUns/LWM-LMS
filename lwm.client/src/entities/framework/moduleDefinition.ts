import LessonFeed from "../../applets/lesson-feed/lesson-feed.tsx";
import {
    controlCenterIcon,
    groupIcon,
    lessonIcon,
    peopleIcon,
    scheduleIcon,
    timetableIcon
} from "../../framework/icons.ts";
import LessonManager from "../../applets/lesson/lesson-manager.tsx";
import PersonManager from "../../applets/people/people-manager.tsx";
import GroupManager from "../../applets/group/group-manager.tsx";
import ScheduleManager from "../../applets/schedule/schedule-manager.tsx";
import TimeTableManager from "../../applets/timeTable/time-table-manager.tsx";
import ControlCenter from "../../applets/controlCenter/control-center.tsx";

export type ModuleDefinition = {
    name: string;
    module: typeof LessonFeed | typeof LessonManager | typeof PersonManager | 
        typeof GroupManager | typeof ScheduleManager | typeof TimeTableManager | typeof ControlCenter;
    active: boolean;
    icon: string;
    navLink: string;
}

export function GetModules() : ModuleDefinition[] {

    const _options: ModuleDefinition[] = [];

    _options.push({
        name: 'Schedule',
        active: false,
        icon: scheduleIcon,
        module: ScheduleManager,
        navLink: 'scheduling'
    });

    _options.push({
        name: 'People',
        active: false,
        icon: peopleIcon,
        module: PersonManager,
        navLink: 'people'
    });

    _options.push({
        name: 'Groups',
        active: false,
        icon: groupIcon,
        module: GroupManager,
        navLink: 'groups'
    });

    _options.push({
        name: 'Timetables',
        active: false,
        icon: timetableIcon,
        module: TimeTableManager,
        navLink: 'timetables'
    })

    _options.push({
        name: 'Lessons',
        active: false,
        icon: lessonIcon,
        module: LessonManager,
        navLink: 'lessons'
    });
    

    _options.push({
        name: 'Control Center',
        active: false,
        icon: controlCenterIcon,
        module: ControlCenter,
        navLink: 'controlcenter'
    })
    
    return _options;
}