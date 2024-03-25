import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../../shared/constants/routes.constants';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  items: MenuItem[] | undefined;
  user!: User;


  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit() {
    this.getLoggedInUser(() => {
      this.items = [
        {
          label: this.user.name,
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
    });
  }
  
  getLoggedInUser(callback: () => void) {
    this.userService.getCurrentUser().subscribe((res: any) => {   
      this.user = res;
      callback(); 
    });
  }
}
