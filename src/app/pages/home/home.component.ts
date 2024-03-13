import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { HomeService } from '../../core/services/home.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  totalEmployeeByStatusChartData: any;
  totalEmployeeByJobTitleChartData: any;
  employeeCount: number | undefined;
  departmentCount: number | undefined;
  userCount: number | undefined;
  employeeStatusCount: Map<string, number> | undefined;
  employeeCountByJobTitle: Map<string, number> | undefined;
  options: any;

  constructor(
    private homeService: HomeService
  ) {}

  toggleSidebar() {
    this.sidebarComponent.sidebarVisible =
      !this.sidebarComponent.sidebarVisible;
  }

  ngOnInit() {
    forkJoin([
      this.homeService.getTotalEmployeeCount(),
      this.homeService.getTotalDepartmentCount(),
      this.homeService.getTotalUserCount(),
      this.homeService.getTotalEmployeesByStatusCount(),
      this.homeService.getTotalEmployeesByJobTitleCount(),
    ]).subscribe(
      ([
        employeeCount,
        departmentCount,
        userCount,
        employeeStatusCount,
        employeeCountByJobTitle,
      ]) => {
        this.employeeCount = employeeCount;
        this.departmentCount = departmentCount;
        this.userCount = userCount;
        this.employeeStatusCount = employeeStatusCount;
        this.employeeCountByJobTitle = employeeCountByJobTitle;

        this.totalEmployeeByStatusChartData = {
          labels: Object.keys(employeeStatusCount),
          datasets: [
            {
              data: Object.values(employeeStatusCount),
              backgroundColor: ['#2B2D42', '#FFD700'],
              hoverBackgroundColor: ['#1D1F2A', '#FFD700'],
            },
          ],
        };

        this.totalEmployeeByJobTitleChartData = {
          labels: Object.keys(employeeCountByJobTitle),
          datasets: [
            {
              data: Object.values(employeeCountByJobTitle),
              backgroundColor: [
                '#2B2D42',
                '#FFD700',
                '#7FFFD4',
                '#FF5733',
                '#C70039',
                '#900C3F',
                '#00CED1',
                '#FFA07A',
                '#6A5ACD',
                '#32CD32',
              ],
              hoverBackgroundColor: [
                '#1D1F2A',
                '#FFD700',
                '#00CED1',
                '#FF5733',
                '#C70039',
                '#900C3F',
                '#7FFFD4',
                '#FFA07A',
                '#6A5ACD',
                '#32CD32',
              ],
            },
          ],
        };
        this.options = {
            cutout: '60%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 10
                }
                }
              }
            }
        
          };
          
      }
    );
  }
}

// import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { Subject, throwError } from 'rxjs';
// import { catchError, takeUntil } from 'rxjs/operators';
// import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
// import { RouteService } from '../../core/services/route.service';
// import { HomeService } from '../../core/services/home.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent implements OnInit, OnDestroy {
//   @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
//   data: any;
//   employeeCount: number | undefined;
//   departmentCount: number | undefined;
//   userCount: number | undefined;
//   employeeStatusCount: Map<string, number> | undefined;
//   employeeCountByJobTitle: Map<string, number> | undefined;
//   private unsubscribe$ = new Subject<void>();

//   constructor(
//     private routeService: RouteService,
//     private homeService: HomeService
//   ) {}

//   toggleSidebar() {
//     this.sidebarComponent.sidebarVisible =
//       !this.sidebarComponent.sidebarVisible;
//   }

//   ngOnInit() {
//     this.fetchData();
//   }

//   ngOnDestroy() {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }

//   private fetchData() {
//     this.homeService
//       .getTotalEmployeeCount()
//       .pipe(
//         takeUntil(this.unsubscribe$),
//         catchError((error) => {
//           console.error(
//             'Error occurred while fetching total employee count:',
//             error
//           );
//           return throwError(() => error);
//         })
//       )
//       .subscribe((employeeCount) => (this.employeeCount = employeeCount));

//     this.homeService
//       .getTotalDepartmentCount()
//       .pipe(
//         takeUntil(this.unsubscribe$),
//         catchError((error) => {
//           console.error(
//             'Error occurred while fetching total department count:',
//             error
//           );
//           return throwError(() => error);
//         })
//       )
//       .subscribe((departmentCount) => (this.departmentCount = departmentCount));

//     this.homeService
//       .getTotalUserCount()
//       .pipe(
//         takeUntil(this.unsubscribe$),
//         catchError((error) => {
//           console.error(
//             'Error occurred while fetching total user count:',
//             error
//           );
//           return throwError(() => error);
//         })
//       )
//       .subscribe((userCount) => (this.userCount = userCount));

//     if (typeof window !== 'undefined') {
//       this.data = {
//         labels: ['A', 'B', 'C'],
//         datasets: [
//           {
//             data: [300, 50, 100],
//             backgroundColor: ['#2B2D42', '#FFD700', '#7FFFD4'],
//             hoverBackgroundColor: ['#1D1F2A', '#FFD700', '#00CED1'],
//           },
//         ],
//       };
//     }
//   }
// }
