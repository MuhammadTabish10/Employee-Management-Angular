import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService]
})
export class UserListComponent {
  @ViewChild('filter') filter!: ElementRef;
  userList: User[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  deleteId!: number;
  deleteUserDialog: any;
  refresh: boolean = true;
  visible: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];

  getAllUsers() {
    this.userService
      .getAllUsers(this.activeStatus)
      .pipe(finalize(() => (this.refresh = false)))
      .subscribe((userList) => (this.userList = userList));
  }

  onRefresh() {
    this.refresh = true;
    this.getAllUsers();
  }

  //   For table filtering purpose
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onStatusChange(data: string) {
    if (data == 'Active') {
      this.activeStatus = true;
      this.getAllUsers();
    } else {
      this.activeStatus = false;
      this.getAllUsers();
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteSelected() {
    this.userService.deleteUserById(this.deleteId).subscribe(() => {
      this.alert();
      this.getAllUsers();
      this.deleteUserDialog = false;
    });
  }

  onDeleteUser(id: number) {
    this.deleteId = id;
    this.deleteUserDialog = true;
  }

  onActiveUser(id: number) {
    this.userService.setUserStatusToActiveById(id).subscribe(() => {
      this.success();
      this.selectedStatus = 'Active';
      this.onStatusChange(this.selectedStatus);
    });
  }

  onEditUser(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate([ROUTES.USER], {
      queryParams: queryParams,
    });
  }

  navigateToCreateUser() {
    this.router.navigateByUrl(ROUTES.USER);
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
