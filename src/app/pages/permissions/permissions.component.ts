import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../core/models/role.model';
import { Permission } from '../../core/models/permission.model';
import { MessageService } from "primeng/api";
import { RoleService } from '../../core/services/role.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../../core/services/permission.service';
import { UserSessionService } from '../../core/guards/user-session.service';

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
  selectedRoleId!: number;
  roleName?: string;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private userSessionService: UserSessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    debugger
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
      console.log(res);
    });
  }

  getAllPermissions() {
    this.permissionService.getAllPermissions().subscribe((res) => {
      this.permissions = res;
      console.log(res);
    })
  }

  getRoleName() {
    this.roles
      .filter((value) => value.id == this.selectedRoleId)
      .map((value) => (this.roleName = value.name));
    return this.roleName;
  }

  addPermission(permission: Permission) {
    let perm = this.permissions.find((value: any) => {
      value.id == permission.id;
    });
    if (perm) {
      console.log(perm);
      perm.status = !permission.status;
    }
  }

  onRoleChange(data: any) {
    this.selectedRoleId = data.value.id;
    this.permissions = this.permissions.map((p: any) => {
      return {
        ...p,
        status: false,
      };
    });

    this.roleService
      .getRoleById(this.selectedRoleId)
      .subscribe((res: any) => {
        res.permissions.forEach((perm: any) => {
          const permission = this.permissions.find(
            (value: any) => value.id === perm.id
          );
          if (permission) {
            permission.status = true;
          }
        });
      });
  }

  onSubmit() {
    if (this.permissionsForm.valid) {
      const rolePermissions: Role = {
        id: this.selectedRoleId,
        name: this.getRoleName() || '',
        permissions: this.permissions,
      };
      

      this.roleService
        .addRolePermissions(rolePermissions)
        .subscribe((res) => {
          this.getAllRoles();
          this.permissionsForm.reset();
          this.getAllPermissions();
        });
    } else {
      this.alert();
    }
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
