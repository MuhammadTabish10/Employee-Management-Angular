import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${API_ENDPOINTS.GET_ALL_ROLE_URL}`
    );
  }

  addRolePermissions(role: Role): Observable<Role> {
    return this.http.post<Role>(API_ENDPOINTS.ADD_ROLE_URL, role);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(
      `${API_ENDPOINTS.GET_ROLE_BY_ID_URL}${id}`
    );
  }

  updateRoleById(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(
      `${API_ENDPOINTS.UPDATE_ROLE_BY_ID_URL}${id}`,
      role
    );
  }
}
