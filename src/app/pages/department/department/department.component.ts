import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { Department } from '../../../core/models/department.model';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  providers: [MessageService]
})
export class DepartmentComponent {
  departmentForm!: FormGroup;
  mode: string = 'Add';
  department!: Department;
  departmentId: any;

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: [null, Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.departmentId = params['id'];
      if (this.departmentId) {
        this.mode = 'Update';
        this.updateForm(this.departmentId);
      }
    });
  }

  patchFormWithData() {
    this.departmentForm.patchValue({
      name: this.department.name
    });
  }

  getDepartmentById(id?: any) {
    this.departmentService.getDepartmentById(id).subscribe((res) => {
      if (res) {
        this.department = res;
        this.patchFormWithData();
      }
    });
  }

  createFromForm() {
    const formValue = this.departmentForm.value;
    const department: Department = {
      id: this.departmentId,
      name: formValue.name,
      status: true,
    };
    return department;
  }

  updateForm(id?: any) {
    this.getDepartmentById(id);
  }

  onSubmit() {
    if (this.departmentForm && this.departmentForm.valid) {
      this.department = this.createFromForm();
      if (this.mode == 'Update') {
        this.departmentService
          .updateDepartmentById(this.department.id, this.department)
          .subscribe({
            next: (res: any) => {
              this.router.navigate([ROUTES.DEPARTMENT_LIST]);
            },
            error: (error) => {
              this.error(error);
            },
          });
      } else {
        this.departmentService.addDepartment(this.department).subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigate([ROUTES.DEPARTMENT_LIST]);
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
    this.router.navigate([ROUTES.DEPARTMENT_LIST]);
  }
}
