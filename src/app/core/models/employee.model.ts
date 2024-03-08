import { Department } from "./department.model";
import { JobTitle } from "./jobTitle.model";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    address: string;
    dateOfBirth: string;
    hireDate: string;
    status: boolean;
    jobtitle: JobTitle;
    department: Department;
}