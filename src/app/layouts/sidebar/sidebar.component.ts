import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes.constants';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  user!: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.userService.getCurrentUser().subscribe((res: any) => {   
      this.user = res;
    });
  }

  navigateToHome() {
    this.router.navigateByUrl(ROUTES.HOME);
    this.sidebarVisible = false;
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl(ROUTES.EMPLOYEE_LIST);
    this.sidebarVisible = false;
  }

  navigateToUserList() {
    this.router.navigateByUrl(ROUTES.USER_LIST);
    this.sidebarVisible = false;
  }

  navigateToJobTitleList() {
    this.router.navigateByUrl(ROUTES.JOB_TITLE_LIST);
    this.sidebarVisible = false;
  }

  navigateToDepartmentList() {
    this.router.navigateByUrl(ROUTES.DEPARTMENT_LIST);
    this.sidebarVisible = false;
  }

  navigateToAttendanceList() {
    this.router.navigateByUrl(ROUTES.ATTENDANCE_LIST);
    this.sidebarVisible = false;
  }

  navigateToSalaryList() {
    this.router.navigateByUrl(ROUTES.SALARY_LIST);
    this.sidebarVisible = false;
  }
}
