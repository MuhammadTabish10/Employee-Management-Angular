import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from '../../../core/models/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../../../core/services/employee.service';
import { JobTitleService } from '../../../core/services/job-title.service';
import { DepartmentService } from '../../../core/services/department.service';
import { JobTitle } from '../../../core/models/jobTitle.model';
import { Department } from '../../../core/models/department.model';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { formatDate } from '@angular/common';
import { Attendance } from '../../../core/models/attendance.model';
import { AttendanceService } from '../../../core/services/attendance.service';
 

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
  providers: [MessageService]
})
export class AttendanceComponent {
  attendanceForm!: FormGroup;
  mode: string = 'Add';
  attendance!: Attendance;
  employees: Employee[] = [];
  attendanceId: any;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      date: [null, Validators.required],
      timeIn: [null, Validators.required],
      timeOut: [null, Validators.required],
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
      this.employees = res;
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
    const attendance: Attendance = {
      id: this.attendanceId,
      date: formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
      timeIn: formValue.timeIn,
      timeOut: formValue.timeOut,
      attendanceStatus: formValue.attendanceStatus,
      employee: formValue.employee,
      status: true,
    };
    return attendance;
  }

  updateForm(id: any) {
    this.getAttendanceById(id);
  }

  onSubmit() {
    if (this.attendanceForm && this.attendanceForm.valid) {
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
