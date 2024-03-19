import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';

@NgModule({
  declarations: [AttendanceListComponent, AttendanceViewComponent],
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    PaginatorModule,
    InputTextareaModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
