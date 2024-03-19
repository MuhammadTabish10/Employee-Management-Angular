import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentFormRoutingModule } from './department-form-routing.module';
import { DepartmentComponent } from '../department.component';


@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentFormRoutingModule
  ]
})
export class DepartmentFormModule { }
