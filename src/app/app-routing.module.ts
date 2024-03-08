import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes.constants';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full'},
  { path: ROUTES.LOGIN, component: LoginComponent },
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:ROUTES.HOME,
        component: HomeComponent
      },
      {
        path:ROUTES.EMPLOYEE_LIST,
        component: EmployeeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
