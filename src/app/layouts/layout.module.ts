import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent],
  exports: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    SidebarModule,
    ButtonModule,
    MenuModule
  ]
})
export class LayoutModule { }
