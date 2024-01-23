import Student from "../applets/people/types/student";

export interface Person {
    id: number;   
    forename: string;
    surname: string;
    emailAddress1: string;
    phoneNo: string;
    personType: number | undefined;
    student?: Student
}