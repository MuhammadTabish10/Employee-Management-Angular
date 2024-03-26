import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) {}

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(
      `${API_ENDPOINTS.GET_ALL_PERMISSION_URL}`
    );
  }

  getPermissionById(id: number): Observable<Permission> {
    return this.http.get<Permission>(
      `${API_ENDPOINTS.GET_PERMISSION_BY_ID_URL}${id}`
    );
  }
}
