import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from "primeng/inputtext";

import { PermissionsComponent } from './permissions.component';
import { PermissionsRoutingModule } from "./permissions-routing.module";

@NgModule({
  declarations: [PermissionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    InputTextModule,
    PermissionsRoutingModule
  ]
})
export class PermissionsModule { }
