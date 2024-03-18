import { Component, ElementRef, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { JobTitle } from '../../../core/models/jobTitle.model';
import { JobTitleService } from '../../../core/services/job-title.service';
import { finalize } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-job-title-list',
  templateUrl: './job-title-list.component.html',
  styleUrl: './job-title-list.component.css',
  providers: [MessageService]
})
export class JobTitleListComponent {
  @ViewChild('filter') filter!: ElementRef;
  jobTitleList: JobTitle[] = [];
  loading: any;
  status: ['Active', 'InActive'] | undefined;
  selectedStatus: string = 'Active';
  activeStatus: boolean = true;
  deleteId!: number;
  deleteJobTitleDialog: any;
  refresh: boolean = true;
  visible: boolean = false;

  constructor(
    private jobTitleService: JobTitleService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllJobTitles();
  }

  options: SelectItem[] = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];

  getAllJobTitles() {
    this.jobTitleService
      .getAllJobTitles(this.activeStatus)
      .pipe(finalize(() => (this.refresh = false)))
      .subscribe((jobTitleList) => (this.jobTitleList = jobTitleList));
  }

  onRefresh() {
    this.refresh = true;
    this.getAllJobTitles();
  }

  //   For table filtering purpose
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onStatusChange(data: string) {
    if (data == 'Active') {
      this.activeStatus = true;
      this.getAllJobTitles();
    } else {
      this.activeStatus = false;
      this.getAllJobTitles();
    }
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteSelected() {
    this.jobTitleService.deleteJobTitleById(this.deleteId).subscribe(() => {
      this.alert();
      this.getAllJobTitles();
      this.deleteJobTitleDialog = false;
    });
  }

  onDeleteJobTitle(id: number) {
    this.deleteId = id;
    this.deleteJobTitleDialog = true;
  }

  onActiveJobTitle(id: number) {
    this.jobTitleService.setJobTitleStatusToActiveById(id).subscribe(() => {
      this.success();
      this.selectedStatus = 'Active';
      this.onStatusChange(this.selectedStatus);
    });
  }

  onEditJobTitle(id: number) {
    const queryParams = { updateMode: 'true', id: id };
    this.router.navigate([ROUTES.JOB_TITLE], {
      queryParams: queryParams,
    });
  }

  navigateToCreateJobTitle() {
    this.router.navigateByUrl(ROUTES.JOB_TITLE);
  }

  success() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Activation Successfull',
    });
  }

  alert() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Deactivation Successfull',
    });
  }
}  
