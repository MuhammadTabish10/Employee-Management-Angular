import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../layouts/layout.module';
import { SharedModule } from '../../shared/shared.module'; 
import { ChartModule } from 'primeng/chart';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    ChartModule
  ]
})
export class HomeModule { }
