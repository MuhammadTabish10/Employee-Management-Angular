import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Muhammad Tabish',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.router.navigate([ROUTES.LOGIN])
          }
        ]
      },
    ];
  }
}
