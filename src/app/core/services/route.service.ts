import { Injectable } from '@angular/core';
import { ROUTES } from '../../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public readonly ROUTES = ROUTES;
  constructor() { }
}
