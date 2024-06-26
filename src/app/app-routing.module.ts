import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTES } from './shared/constants/routes.constants';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { authguardService } from "./core/guards/auth.guard.service";
import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { PermissionComponent } from "./pages/permission/permission.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [authguardService],
    children: [
      {
        path: ROUTES.HOME,
        loadChildren: () =>
          import("./pages/home/home.module").then(
            (m) => m.HomeModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.EMPLOYEE_LIST,
        loadChildren: () =>
          import("./pages/employee/employee.module").then(
            (m) => m.EmployeeModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.EMPLOYEE,
        loadChildren: () =>
          import("./pages/employee/employee/modules/employee-form.module").then(
            (m) => m.EmployeeFormModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.USER_LIST,
        loadChildren: () =>
          import("./pages/user/user.module").then(
            (m) => m.UserModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.USER,
        loadChildren: () =>
          import("./pages/user/user/modules/user-form.module").then(
            (m) => m.UserFormModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.JOB_TITLE_LIST,
        loadChildren: () =>
          import("./pages/job-title/job-title.module").then(
            (m) => m.JobTitleModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.JOB_TITLE,
        loadChildren: () =>
          import("./pages/job-title/job-title/job-title/modules/job-title-form.module").then(
            (m) => m.JobTitleFormModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.DEPARTMENT_LIST,
        loadChildren: () =>
          import("./pages/department/department.module").then(
            (m) => m.DepartmentModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.DEPARTMENT,
        loadChildren: () =>
          import("./pages/department/department/modules/department-form.module").then(
            (m) => m.DepartmentFormModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.ATTENDANCE_LIST,
        loadChildren: () =>
          import("./pages/attendance/attendance.module").then(
            (m) => m.AttendanceModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.ATTENDANCE,
        loadChildren: () =>
          import("./pages/attendance/attendance/modules/attendance-form.module").then(
            (m) => m.AttendanceFormModule
          ),
          canActivate: [authguardService],
      },
      {
        path: ROUTES.PERMISSIONS,
        component: PermissionComponent,
        canActivate: [authguardService],
      },
    ],
  },
  { path: ROUTES.LOGIN, component: LoginComponent },
  { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full'},
  { path: ROUTES.ACCESS, component: AccessdeniedComponent },
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
