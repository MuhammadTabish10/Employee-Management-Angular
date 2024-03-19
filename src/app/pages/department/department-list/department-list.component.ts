import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { finalize } from 'rxjs';
import { Table } from 'primeng/table';
import { Department } from '../../../core/models/department.model';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
  providers: [MessageService]
})
export class DepartmentListComponent {
  @ViewChild('filter') filter!: ElementRef;
  departmentList: Department[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  deleteId!: number;
  deleteDepartmentDialog: any;
  refresh: boolean = true;
  visible: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllDepartments();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];

  getAllDepartments() {
    this.departmentService
      .getAllDepartments(this.activeStatus)
      .pipe(finalize(() => (this.refresh = false)))
      .subscribe((departmentList) => (this.departmentList = departmentList));
  }

  onRefresh() {
    this.refresh = true;
    this.getAllDepartments();
  }

  //  For table filtering purpose
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onStatusChange(data: string) {
    if (data == 'Active') {
      this.activeStatus = true;
      this.getAllDepartments();
    } else {
      this.activeStatus = false;
      this.getAllDepartments();
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteSelected() {
    this.departmentService.deleteDepartmentById(this.deleteId).subscribe(() => {
      this.alert();
      this.getAllDepartments();
      this.deleteDepartmentDialog = false;
    });
  }

  onDeleteDepartment(id: number) {
    this.deleteId = id;
    this.deleteDepartmentDialog = true;
  }

  onActiveDepartment(id: number) {
    this.departmentService.setDepartmentStatusToActiveById(id).subscribe(() => {
      this.success();
      this.selectedStatus = 'Active';
      this.onStatusChange(this.selectedStatus);
    });
  }

  onEditDepartment(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate([ROUTES.DEPARTMENT], {
      queryParams: queryParams,
    });
  }

  navigateToCreateDepartment() {
    this.router.navigateByUrl(ROUTES.DEPARTMENT);
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
