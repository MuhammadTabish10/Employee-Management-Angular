import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DepartmentComponent } from '../department.component';

const routes: Route[] = [{ path: "", component: DepartmentComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepartmentFormRoutingModule { }