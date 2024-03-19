import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) {}

  getAllAttendance(status: boolean): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${API_ENDPOINTS.GET_ALL_ATTENDANCE_URL}${status}`
    );
  }

  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(API_ENDPOINTS.ADD_ATTENDANCE_URL, attendance);
  }

  getAttendanceById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(
      `${API_ENDPOINTS.GET_ATTENDANCE_BY_ID_URL}${id}`
    );
  }

  deleteAttendanceById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_ATTENDANCE_BY_ID_URL}${id}`
    );
  }

  setAttendanceStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_ATTENDANCE_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateAttendanceById(id: number, attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(
      `${API_ENDPOINTS.UPDATE_ATTENDANCE_BY_ID_URL}${id}`,
      attendance
    );
  }
}
