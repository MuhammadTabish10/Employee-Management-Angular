import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from '../../../core/models/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../../../core/services/employee.service';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { formatDate } from '@angular/common';
import { Attendance } from '../../../core/models/attendance.model';
import { AttendanceService } from '../../../core/services/attendance.service';
import { AttendanceStatus } from '../../../shared/enums/attendanceStatus.enum';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
  providers: [MessageService, DatePipe]
})
export class AttendanceComponent implements OnInit{
  attendanceForm!: FormGroup;
  mode: string = 'Add';
  attendance!: Attendance;
  employees: Employee[] = [];
  attendanceStatusOptions = Object.values(AttendanceStatus);
  attendanceId: any;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      date: [null, Validators.required],
      timeIn: [null],
      timeOut: [null],
      attendanceStatus: [null, Validators.required],
      employee: [null, Validators.required]
    });

    this.getAllEmployees();

    this.route.queryParams.subscribe((params) => {
      this.attendanceId = params['id'];
      if (this.attendanceId) {
        this.mode = 'Update';
        this.updateForm(this.attendanceId);
      }
    });
  }

  patchFormWithData() {
    this.attendanceForm.patchValue({
      date: this.attendance.date,
      timeIn: this.attendance.timeIn,
      timeOut: this.attendance.timeOut,
      attendanceStatus: this.attendance.attendanceStatus,
      employee: this.attendance.employee
    });
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees(true).subscribe((res: Employee[]) => {
      this.employees = res
    });
  }
  

  getAttendanceById(id?: any) {
    this.attendanceService.getAttendanceById(id).subscribe((res) => {
      if (res) {
        this.attendance = res;
        this.patchFormWithData();
      }
    });
  }

  createFromForm() {
    const formValue = this.attendanceForm.value;
    
    let attendance: Attendance = {
      id: this.attendanceId,
      date: formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
      attendanceStatus: formValue.attendanceStatus,
      employee: formValue.employee,
      status: true,
    };
  
    if (formValue.timeIn !== null) {
      const timeInFormatted = this.datePipe.transform(formValue.timeIn, 'HH:mm:ss');
      attendance = { ...attendance, timeIn: timeInFormatted };
    }
  
    if (formValue.timeOut !== null) {
      const timeOutFormatted = this.datePipe.transform(formValue.timeOut, 'HH:mm:ss');
      attendance = { ...attendance, timeOut: timeOutFormatted };
    }
    return attendance;
  }

  updateForm(id: any) {
    this.getAttendanceById(id);
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      this.attendance = this.createFromForm();
      if (this.mode == 'Update') {
        this.attendanceService
          .updateAttendanceById(this.attendance.id, this.attendance)
          .subscribe({
            next: (res: any) => {
              this.router.navigate([ROUTES.ATTENDANCE_LIST]);
            },
            error: (error) => {
              this.error(error);
            },
          });
      } else {
        this.attendanceService.addAttendance(this.attendance).subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigate([ROUTES.ATTENDANCE_LIST]);
            }
          },
          error: (error) => {
            this.error(error);
            console.log(error);
          },
        });
      }
    } else {
      this.alert();
    }
  }

  error(error: HttpErrorResponse) {
    if (error.error) {
      const errorMessages = Object.values(error.error);
      if (errorMessages.length > 0) {
        const firstErrorMessage = errorMessages[0] as string;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: firstErrorMessage,
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred.',
      });
    }
  }
  

  alert() {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: 'Please ensure that all required details are filled out.',
    });
  }

  onCancel() {
    this.router.navigate([ROUTES.ATTENDANCE_LIST]);
  }
}
