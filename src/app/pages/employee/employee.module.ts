import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  declarations: [EmployeeListComponent],
  exports: [EmployeeListComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class EmployeeModule { }
