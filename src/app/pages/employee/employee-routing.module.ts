import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Route[] = [
    { path: "", component: EmployeeListComponent },
    { path: ":id", component: EmployeeViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule { }