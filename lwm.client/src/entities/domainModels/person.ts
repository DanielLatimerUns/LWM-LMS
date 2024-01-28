import Student from "./student";
import Teacher from "./teacher";

export interface Person {
    id: number;   
    forename: string;
    surname: string;
    emailAddress1: string;
    phoneNo: string;
    personType: number | undefined;
    student?: Student;
    teacher?: Teacher;
}