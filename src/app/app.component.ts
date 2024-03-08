import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LoaderService } from './core/services/loader.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeDashboard';
  constructor(
    private primengConfig: PrimeNGConfig,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
