import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(status: boolean): Observable<User[]> {
    return this.http.get<User[]>(
      `${API_ENDPOINTS.GET_ALL_USER_URL}${status}`
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(API_ENDPOINTS.ADD_USER_URL, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${API_ENDPOINTS.GET_USER_BY_ID_URL}${id}`
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(
      `${API_ENDPOINTS.GET_CURRENT_USER_URL}`
    );
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete<any>(
      `${API_ENDPOINTS.DELETE_USER_BY_ID_URL}${id}`
    );
  }

  setUserStatusToActiveById(id: number): Observable<any> {
    return this.http.put<any>(
      `${API_ENDPOINTS.UPDATE_USER_STATUS_TO_ACTIVE_URL}${id}/status`,
      null
    );
  }

  updateUserById(id: number, user: User): Observable<User> {
    return this.http.put<User>(
      `${API_ENDPOINTS.UPDATE_USER_BY_ID_URL}${id}`,
      user
    );
  }
}
