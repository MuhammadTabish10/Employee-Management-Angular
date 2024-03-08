import { Component } from '@angular/core';
import { RouteService } from '../../core/services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  constructor(private router: Router, private routeService: RouteService) {}

  navigateToHome() {
    this.router.navigateByUrl(this.routeService.ROUTES.HOME);
    this.sidebarVisible = false;
  }

  navigateToEmployeeList() {
    this.router.navigateByUrl(this.routeService.ROUTES.EMPLOYEE_LIST);
    this.sidebarVisible = false;
  }
}
