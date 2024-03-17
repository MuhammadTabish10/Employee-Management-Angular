import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  constructor(private router: Router) {}

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
}
