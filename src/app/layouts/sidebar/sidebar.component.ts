import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes.constants';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { UserSessionService } from '../../core/guards/user-session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  user!: User;
  routes: any = ROUTES;
  
  // Define sidebar items array
  sidebarItems = [
    { label: 'Home', route: ROUTES.HOME, permission: 'HOME', icon: 'pi pi-home' },
    { label: 'Employees', route: ROUTES.EMPLOYEE_LIST, permission: 'EMPLOYEES', icon: 'pi pi-users' },
    { label: 'Departments', route: ROUTES.DEPARTMENT_LIST, permission: 'DEPARTMENTS', icon: 'pi pi-database' },
    { label: 'Job Titles', route: ROUTES.JOB_TITLE_LIST, permission: 'JOBTITLES', icon: 'pi pi-id-card' },
    { label: 'Attendance', route: ROUTES.ATTENDANCE_LIST, permission: 'ATTENDANCE', icon: 'pi pi-calendar' },
    { label: 'Salary', route: ROUTES.SALARY_LIST, permission: 'SALARY', icon: 'pi pi-money-bill' },
    { label: 'Permissions', route: ROUTES.PERMISSIONS, permission: 'PERMISSION', icon: 'pi pi-shield' },
    { label: 'Users', route: ROUTES.USER_LIST, permission: 'USERS', icon: 'pi pi-user' }
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    public sessionStorage: UserSessionService
  ) {}

  ngOnInit() {
    this.sessionStorage.updatePermission();
    this.getLoggedInUser();
  }

  hasPermission(permission: string): boolean {
    return this.sessionStorage.hasPermission(permission);
  }

  getLoggedInUser() {
    this.userService.getCurrentUser().subscribe((res: any) => {   
      this.user = res;
    });
  }

  navigate(route: string) {
    this.router.navigateByUrl(route);
    this.sidebarVisible = false;
  }
}
