import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(status: boolean): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${API_ENDPOINTS.GET_ALL_EMPLOYEE_URL}${status}`
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_ENDPOINTS.ADD_EMPLOYEE_URL, employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${API_ENDPOINTS.GET_EMPLOYEE_BY_ID_URL}${id}`
    );
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_EMPLOYEE_BY_ID_URL}${id}`
    );
  }

  setEmployeeStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_EMPLOYEE_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateEmployeeById(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${API_ENDPOINTS.UPDATE_EMPLOYEE_BY_ID_URL}${id}`,
      employee
    );
  }
}
