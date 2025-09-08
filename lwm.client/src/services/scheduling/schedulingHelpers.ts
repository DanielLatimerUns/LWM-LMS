import {WeekDay} from "../../entities/app/schedule";

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

    return({weekDays});
}

export default schedulingService();