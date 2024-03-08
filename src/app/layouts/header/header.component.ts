import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RouteService } from '../../core/services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  items: MenuItem[] | undefined;
  // showHeader: boolean = true; // Add this property

  constructor(
    private router: Router,
    private routeService: RouteService
  ) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.showHeader = !this.router.url.includes(this.routeService.ROUTES.LOGIN);
    //   }
    // });

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
            command: () => this.router.navigate([this.routeService.ROUTES.LOGIN])
          }
        ]
      },
    ];
  }
}
