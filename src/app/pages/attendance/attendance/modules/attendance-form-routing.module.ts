import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AttendanceComponent } from '../attendance.component';

const routes: Route[] = [{ path: "", component: AttendanceComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AttendanceFormRoutingModule { }