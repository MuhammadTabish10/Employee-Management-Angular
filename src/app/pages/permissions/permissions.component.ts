import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../core/models/role.model';
import { Permission } from '../../core/models/permission.model';
import { MessageService } from "primeng/api";
import { RoleService } from '../../core/services/role.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../../core/services/permission.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
  providers: [MessageService]
})
export class PermissionsComponent {
  permissionsForm!: FormGroup;
  roles: Role[] = [];
  permissions: Permission[] = [];
  selectedRoleId?: number;
  roleName?: string;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formSetup();
    this.getAllRoles();
    this.getAllPermissions();
  }

  formSetup() {
    this.permissionsForm = this.fb.group({
      role: ["", [Validators.required]],
      permissions: this.fb.array([]),
    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  getAllPermissions() {
    this.permissionService.getAllPermissions().subscribe((res) => {
      this.permissions = res;
    })
  }

  getRoleName() {
    this.roles
      .filter((value) => value.id == this.selectedRoleId)
      .map((value) => (this.roleName = value.name));
    return this.roleName;
  }


  
  alert() {
    this.messageService.add({
      severity: "error",
      summary: "Warning",
      detail: "Please ensure that you have selected the role",
    });
  }
  success() {
    this.messageService.add({
      severity: "success",
      summary: "success",
      detail: "Permission Updated Successfully",
    });
  }

}
