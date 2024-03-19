import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Salary } from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) {}

  getAllSalary(status: boolean): Observable<Salary[]> {
    return this.http.get<Salary[]>(
      `${API_ENDPOINTS.GET_ALL_SALARY_URL}${status}`
    );
  }

  addSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(API_ENDPOINTS.ADD_SALARY_URL, salary);
  }

  getSalaryById(id: number): Observable<Salary> {
    return this.http.get<Salary>(
      `${API_ENDPOINTS.GET_SALARY_BY_ID_URL}${id}`
    );
  }

  deleteSalaryById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_SALARY_BY_ID_URL}${id}`
    );
  }

  setSalaryStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_SALARY_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateSalaryById(id: number, salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(
      `${API_ENDPOINTS.UPDATE_SALARY_BY_ID_URL}${id}`,
      salary
    );
  }
}
