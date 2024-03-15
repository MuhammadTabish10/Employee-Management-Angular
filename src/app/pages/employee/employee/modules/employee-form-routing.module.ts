import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeComponent } from '../employee.component';

const routes: Route[] = [{ path: "", component: EmployeeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeFormRoutingModule { }