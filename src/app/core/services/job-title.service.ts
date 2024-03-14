import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { JobTitle } from '../models/jobTitle.model';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(private http: HttpClient) {}

  getAllJobTitles(status: boolean): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(
      `${API_ENDPOINTS.GET_ALL_JOB_TITLE_URL}${status}`
    );
  }

  addJobTitle(jobTitle: JobTitle): Observable<JobTitle> {
    return this.http.post<JobTitle>(API_ENDPOINTS.ADD_JOB_TITLE_URL, jobTitle);
  }

  getJobTitleById(id: number): Observable<JobTitle> {
    return this.http.get<JobTitle>(
      `${API_ENDPOINTS.GET_JOB_TITLE_BY_ID_URL}${id}`
    );
  }

  deleteJobTitleById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_JOB_TITLE_BY_ID_URL}${id}`
    );
  }

  setJobTitleStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_JOB_TITLE_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateJobTitleById(id: number, jobTitle: JobTitle): Observable<JobTitle> {
    return this.http.put<JobTitle>(
      `${API_ENDPOINTS.UPDATE_JOB_TITLE_BY_ID_URL}${id}`,
      jobTitle
    );
  }
}
