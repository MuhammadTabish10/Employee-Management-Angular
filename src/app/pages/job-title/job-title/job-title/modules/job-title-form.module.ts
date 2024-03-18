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
import { JobTitleComponent } from '../job-title.component';
import { JobTitleFormRoutingModule } from './job-title-form-routing.module';

@NgModule({
  declarations: [JobTitleComponent],
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
    JobTitleFormRoutingModule
  ]
})
export class JobTitleFormModule { }
