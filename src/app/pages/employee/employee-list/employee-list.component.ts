import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers: [MessageService],
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;
  employeeList: Employee[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  deleteId!: number;
  deleteAccountDialog: any;
  refresh: boolean = true;
  visible: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];


  getAllEmployees(){  
    this.employeeService
      .getAllEmployees(this.activeStatus)
      .pipe(finalize(() => this.refresh = false))
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
    this.employeeService
      .deleteEmployeeById(this.deleteId)
      .subscribe(() => {
        this.alert();
        this.getAllEmployees();
        this.deleteAccountDialog = false;
      });
  }

  onDeleteAccount(id: number) {
    this.deleteId = id;
    this.deleteAccountDialog = true;
  }

  onCancel() {
    this.visible = false;
  }

  onEditAccount(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate(['create-account'], {
      queryParams: queryParams,
    });
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
}
