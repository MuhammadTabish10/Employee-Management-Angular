import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http:HttpClient) { }

  getTotalEmployeeCount(): Observable<number>{
    return this.http.get<number>(API_ENDPOINTS.EMPLOYEE_COUNT_URL);
  }

  getTotalDepartmentCount(): Observable<number>{
    return this.http.get<number>(API_ENDPOINTS.DEPARTMENT_COUNT_URL);
  }

  getTotalUserCount(): Observable<number>{
    return this.http.get<number>(API_ENDPOINTS.USER_COUNT_URL);
  }

  getTotalEmployeesByStatusCount(): Observable<Map<string,number>>{
    return this.http.get<Map<string,number>>(API_ENDPOINTS.EMPLOYEE_BY_STATUS_COUNT_URL);
  }

  getTotalEmployeesByJobTitleCount(): Observable<Map<string,number>>{
    return this.http.get<Map<string,number>>(API_ENDPOINTS.EMPLOYEE_BY_JOB_COUNT_URL);
  }
}
