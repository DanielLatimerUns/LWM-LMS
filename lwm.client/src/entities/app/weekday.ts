import Week from "./week";

export default interface WeekDay {
    dayNumber: number;
    displayName: string;
    week?: Week;
}