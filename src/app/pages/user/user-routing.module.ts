import { NgModule } from '@angular/core';
import { Route, RouterModule, } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Route[] = [
  { path: "", component: UserListComponent },
  { path: ":id", component: UserViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
