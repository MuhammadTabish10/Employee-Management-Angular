import { AttendanceStatus } from "../../shared/enums/attendanceStatus.enum";
import { Employee } from "./employee.model";

export interface Attendance {
    id: number;
    date: string;
    timeIn?: string | null;
    timeOut?: string | null;
    status: boolean;
    attendanceStatus: AttendanceStatus;
    employee: Employee;  
}