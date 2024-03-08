import { Employee } from "./employee.model";

export interface Salary {
    id: number;
    createdAt: string;
    amount: number;
    startDate: string;
    endDate: string;
    status: boolean;
    employee: Employee;
}