// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ROUTES } from './shared/constants/routes.constants';
// import { LoginComponent } from './pages/login/login.component';
// import { HomeComponent } from './pages/home/home.component';
// import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
// import { LayoutComponent } from './layouts/layout/layout.component';
// import { EmployeeComponent } from './pages/employee/employee/employee.component';
// import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';

// const routes: Routes = [
  // { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full'},
  // { path: ROUTES.LOGIN, component: LoginComponent },
//   {
//     path:'',
//     component: LayoutComponent,
//     children:[
//       {
//         path:ROUTES.HOME,
//         component: HomeComponent
//       },
//       {
//         path:ROUTES.EMPLOYEE_LIST,
//         component: EmployeeListComponent
//       },
//       {
//         path:ROUTES.EMPLOYEE,
//         component: EmployeeComponent
//       },
//       {
//         path:ROUTES.EMPLOYEE_VIEW,
//         component: EmployeeViewComponent
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTES } from './shared/constants/routes.constants';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: ROUTES.HOME,
        loadChildren: () =>
          import("./pages/home/home.module").then(
            (m) => m.HomeModule
          ),
      },
      {
        path: ROUTES.EMPLOYEE_LIST,
        loadChildren: () =>
          import("./pages/employee/employee.module").then(
            (m) => m.EmployeeModule
          ),
      }
      ,
      {
        path: ROUTES.EMPLOYEE,
        loadChildren: () =>
          import("./pages/employee/employee/modules/employee-form.module").then(
            (m) => m.EmployeeFormModule
          ),
      }
    ],
  },
  { path: ROUTES.LOGIN, component: LoginComponent },
  { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full'},
  // { path: "**", redirectTo: "/notfound" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled"
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
