import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from "primeng/tooltip";
import { PaginatorModule } from "primeng/paginator";
import { ToastModule } from "primeng/toast";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { JobTitleRoutingModule } from './job-title-routing.module';
import { JobTitleListComponent } from './job-title-list/job-title-list.component';


@NgModule({
  declarations: [JobTitleListComponent],
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
    JobTitleRoutingModule
  ]
})
export class JobTitleModule { }
