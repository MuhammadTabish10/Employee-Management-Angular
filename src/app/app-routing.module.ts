import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTES } from './shared/constants/routes.constants';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';

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
      },
      {
        path: ROUTES.EMPLOYEE,
        loadChildren: () =>
          import("./pages/employee/employee/modules/employee-form.module").then(
            (m) => m.EmployeeFormModule
          ),
      },
      {
        path: ROUTES.USER_LIST,
        loadChildren: () =>
          import("./pages/user/user.module").then(
            (m) => m.UserModule
          ),
      },
      {
        path: ROUTES.USER,
        loadChildren: () =>
          import("./pages/user/user/modules/user-form.module").then(
            (m) => m.UserFormModule
          ),
      },
      {
        path: ROUTES.JOB_TITLE_LIST,
        loadChildren: () =>
          import("./pages/job-title/job-title.module").then(
            (m) => m.JobTitleModule
          ),
      },
      {
        path: ROUTES.JOB_TITLE,
        loadChildren: () =>
          import("./pages/job-title/job-title/job-title/modules/job-title-form.module").then(
            (m) => m.JobTitleFormModule
          ),
      },
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
