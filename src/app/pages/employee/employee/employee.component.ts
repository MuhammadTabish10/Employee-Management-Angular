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
 
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [MessageService],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  mode: string = 'Add';
  employee!: Employee;
  jobTitles: JobTitle[] = [];
  departments: Department[] = [];
  employeeId: any;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private jobTitleService: JobTitleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      hireDate: [null, Validators.required],
      jobTitle: [null, Validators.required],
      department: [null, Validators.required],
    });

    this.getAllDepartments();
    this.getAllJobTitles();

    this.route.queryParams.subscribe((params) => {
      this.employeeId = params['id'];
      if (this.employeeId) {
        this.mode = 'Update';
        this.updateForm(this.employeeId);
      }
    });
  }

  patchFormWithData() {
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      address: this.employee.address,
      phoneNumber: this.employee.phoneNumber,
      dateOfBirth: this.employee.dateOfBirth,
      hireDate: this.employee.hireDate,
      department: this.employee.department,
      jobTitle: this.employee.jobTitle,
    });
  }

  getAllJobTitles() {
    this.jobTitleService.getAllJobTitles(true).subscribe((res: JobTitle[]) => {
      this.jobTitles = res;
    });
  }

  getAllDepartments() {
    this.departmentService
      .getAllDepartments(true)
      .subscribe((res: Department[]) => {
        this.departments = res;
      });
  }

  getEmployeeById(id?: any) {
    this.employeeService.getEmployeeById(id).subscribe((res) => {
      if (res) {
        this.employee = res;
        this.patchFormWithData();
      }
    });
  }

  createFromForm() {
    const formValue = this.employeeForm.value;
    const employee: Employee = {
      id: this.employeeId,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phoneNumber: formValue.phoneNumber,
      address: formValue.address,
      dateOfBirth: formatDate(formValue.dateOfBirth, 'yyyy-MM-dd', 'en-US'),
      hireDate: formatDate(formValue.hireDate, 'yyyy-MM-dd', 'en-US'),
      department: formValue.department,
      jobTitle: formValue.jobTitle,
      status: true,
    };
    return employee;
  }

  updateForm(id: any) {
    this.getEmployeeById(id);
  }

  onSubmit() {
    if (this.employeeForm && this.employeeForm.valid) {
      this.employee = this.createFromForm();
      if (this.mode == 'Update') {
        this.employeeService
          .updateEmployeeById(this.employee.id, this.employee)
          .subscribe({
            next: (res: any) => {
              this.router.navigate([ROUTES.EMPLOYEE_LIST]);
            },
            error: (error) => {
              this.error(error);
            },
          });
      } else {
        this.employeeService.addEmployee(this.employee).subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigate([ROUTES.EMPLOYEE_LIST]);
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
    this.router.navigate([ROUTES.EMPLOYEE_LIST]);
  }
}
