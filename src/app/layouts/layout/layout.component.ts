import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
    toggleSidebar() {
        this.sidebarComponent.sidebarVisible = !this.sidebarComponent.sidebarVisible;
    }
}
