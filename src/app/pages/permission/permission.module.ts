import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from "primeng/inputtext";

import { PermissionComponent } from './permission.component';

@NgModule({
  declarations: [PermissionComponent],
  exports: [PermissionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    InputTextModule  ]
})
export class PermissionModule { }
