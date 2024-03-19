import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { Attendance } from '../../../core/models/attendance.model';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.css',
  providers: [MessageService]
})
export class AttendanceListComponent {
  @ViewChild('filter') filter!: ElementRef;
  attendanceList: Attendance[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  deleteId!: number;
  deleteAttendanceDialog: any;
  refresh: boolean = true;
  visible: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllAttendance();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];

  getAllAttendance() {
    this.attendanceService
      .getAllAttendance(this.activeStatus)
      .pipe(finalize(() => (this.refresh = false)))
      .subscribe((attendanceList) => (this.attendanceList = attendanceList));
  }

  onRefresh() {
    this.refresh = true;
    this.getAllAttendance();
  }

  //   For table filtering purpose
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onStatusChange(data: string) {
    if (data == 'Active') {
      this.activeStatus = true;
      this.getAllAttendance();
    } else {
      this.activeStatus = false;
      this.getAllAttendance();
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteSelected() {
    this.attendanceService.deleteAttendanceById(this.deleteId).subscribe(() => {
      this.alert();
      this.getAllAttendance();
      this.deleteAttendanceDialog = false;
    });
  }

  onDeleteAttendance(id: number) {
    this.deleteId = id;
    this.deleteAttendanceDialog = true;
  }

  onActiveAttendance(id: number) {
    this.attendanceService.setAttendanceStatusToActiveById(id).subscribe(() => {
      this.success();
      this.selectedStatus = 'Active';
      this.onStatusChange(this.selectedStatus);
    });
  }

  onEditAttendance(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate([ROUTES.ATTENDANCE], {
      queryParams: queryParams,
    });
  }

  navigateToCreateAttendance() {
    this.router.navigateByUrl(ROUTES.ATTENDANCE);
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
