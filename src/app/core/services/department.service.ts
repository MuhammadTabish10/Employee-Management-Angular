import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}

  getAllDepartments(status: boolean): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${API_ENDPOINTS.GET_ALL_DEPARTMENT_URL}${status}`
    );
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(API_ENDPOINTS.ADD_DEPARTMENT_URL, department);
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(
      `${API_ENDPOINTS.GET_DEPARTMENT_BY_ID_URL}${id}`
    );
  }

  deleteDepartmentById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_DEPARTMENT_BY_ID_URL}${id}`
    );
  }

  setDepartmentStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_DEPARTMENT_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateDepartmentById(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(
      `${API_ENDPOINTS.UPDATE_DEPARTMENT_BY_ID_URL}${id}`,
      department
    );
  }
}
