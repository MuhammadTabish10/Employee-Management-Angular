import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post<any>(API_ENDPOINTS.LOGIN_URL, data, httpOptions);
  }
}
