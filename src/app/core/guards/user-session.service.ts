import { Injectable, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  userPermissions: string[] = [];
  roleName!: String;

  constructor(
    private userService: UserService
  ) {
    this.updatePermission();
  }

  updatePermission() {
    const token = localStorage.getItem("token");
    const decodedToken = this.getDecodedToken(token!);

    if (decodedToken) {
      let decodedTokenPermissions = decodedToken.PERMISSIONS;
      this.userPermissions = decodedTokenPermissions;

      let role = decodedToken.ROLES;
      this.roleName = role[0];
    }
  }

  hasPermission(requiredPermissions: string | string[]): boolean {
    if (Array.isArray(requiredPermissions)) {
      // Check if the user has at least one of the required permissions in the array
      return requiredPermissions.some((permission) =>
        this.userPermissions.includes(permission)
      );
    } else {
      // Check if the user has the single required permission
      return this.userPermissions.includes(requiredPermissions);
    }
  }

  getRoleName() {
    return this.roleName;
  }

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding JWT token:' + Error);
    }
  }

}

