import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
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

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';

@NgModule({
  declarations: [DepartmentListComponent],
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
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
