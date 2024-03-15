import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from "primeng/tooltip";
import { PaginatorModule } from "primeng/paginator";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormRoutingModule } from './employee-form-routing.module';
import { EmployeeComponent } from '../employee.component';


@NgModule({
  declarations: [EmployeeComponent],
  exports: [EmployeeComponent],
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    PaginatorModule,
    InputTextareaModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    InputNumberModule,
    DialogModule,
    ProgressBarModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeFormRoutingModule
  ]
})
export class EmployeeFormModule { }
