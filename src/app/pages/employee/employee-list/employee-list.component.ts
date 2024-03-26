import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers: [MessageService, DatePipe]
})
export class EmployeeListComponent {
  @ViewChild('filter') filter!: ElementRef;
  employeeList: Employee[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  id!: number;
  deleteEmployeeDialog: any;
  refresh: boolean = true;
  visible: boolean = false;
  excelDataForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.excelDataForm = new FormGroup({
      toDate: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
    });
    this.getAllEmployees();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];

  getAllEmployees() {
    this.employeeService
      .getAllEmployees(this.activeStatus)
      .pipe(finalize(() => (this.refresh = false)))
      .subscribe((employeeList) => (this.employeeList = employeeList));
  }

  onRefresh() {
    this.refresh = true;
    this.getAllEmployees();
  }

  //   For table filtering purpose
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onStatusChange(data: string) {
    if (data == 'Active') {
      this.activeStatus = true;
      this.getAllEmployees();
    } else {
      this.activeStatus = false;
      this.getAllEmployees();
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteSelected() {
    this.employeeService.deleteEmployeeById(this.id).subscribe(() => {
      this.alert();
      this.getAllEmployees();
      this.deleteEmployeeDialog = false;
    });
  }

  onDeleteEmployee(id: number) {
    this.id = id;
    this.deleteEmployeeDialog = true;
  }

  onActiveEmployee(id: number) {
    this.employeeService.setEmployeeStatusToActiveById(id).subscribe(() => {
      this.success();
      this.selectedStatus = 'Active';
      this.onStatusChange(this.selectedStatus);
    });
  }

  onEditEmployee(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate([ROUTES.EMPLOYEE], {
      queryParams: queryParams,
    });
  }

  navigateToCreateEmployee() {
    this.router.navigateByUrl(ROUTES.EMPLOYEE);
  }

  openExcelDialog(employeeId: number){
    this.id = employeeId;
    this.visible = true;
  }

  onDownloadExcel(data: any, id: number) {
    if (this.excelDataForm.valid) {
      const formattedDates = {
        startDate: this.datePipe.transform(data.fromDate, "yyyy-MM-dd"),
        endDate: this.datePipe.transform(data.toDate, "yyyy-MM-dd"),
      };

      this.employeeService
        .getEmployeeExcel(id,formattedDates)
        .subscribe({
          next: (res: any) => {
            this.employeeService.downloadExcelFile(
              res,
              `Employee_${formattedDates.startDate}_to_${formattedDates.endDate}.xlsx`
            );
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Download Successfull",
            }),
            this.excelDataForm.reset();
            this.visible = false;
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "No Data Found",
            });
          }
        })
           
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Fill All The Fields.",
      });
    }
  }

  success() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Activation Successfull',
    });
  }

  alert() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Deactivation Successfull',
    });
  }

  onCancel() {
    this.visible = false;
  }
}
