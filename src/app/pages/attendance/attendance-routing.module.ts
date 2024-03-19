import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';

const routes: Route[] = [
  { path: "", component: AttendanceListComponent },
  { path: ":id", component: AttendanceViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
