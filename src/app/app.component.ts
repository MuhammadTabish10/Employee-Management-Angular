import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeDashboard';
  constructor(
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
