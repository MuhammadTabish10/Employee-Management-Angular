import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';
import { ROUTES } from '../../shared/constants/routes.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  const token = localStorage.getItem('token');
  if (token && !req.url.includes(ROUTES.LOGIN)) { // Skip adding token for login request
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq).pipe(finalize(() => loaderService.hideLoader()));
  }
  return next(req).pipe(finalize(() => loaderService.hideLoader()));
}