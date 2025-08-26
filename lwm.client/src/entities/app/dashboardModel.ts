import { Lesson } from "../domainModels/Lesson";
import { Group } from "../domainModels/group";
import { LessonSchedule} from "../domainModels/lessonSchedule";
import { Student} from "../domainModels/student";
import { LessonDocument } from "../framework/LessonDocument";

export type DashboardModel = {
    lesson?: Lesson;
    lessonSchedule: LessonSchedule;
    students: Student[];
    documents: LessonDocument[];
    group?: Group;
}