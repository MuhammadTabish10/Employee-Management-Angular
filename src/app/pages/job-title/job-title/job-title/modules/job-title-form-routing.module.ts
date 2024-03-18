import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { JobTitleComponent } from '../job-title.component';

const routes: Route[] = [{ path: "", component: JobTitleComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobTitleFormRoutingModule { }