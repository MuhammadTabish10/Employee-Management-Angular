import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { JobTitle } from '../../../../core/models/jobTitle.model';
import { JobTitleService } from '../../../../core/services/job-title.service';
import { ROUTES } from '../../../../shared/constants/routes.constants';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.css',
  providers: [MessageService]
})
export class JobTitleComponent {
  jobTitleForm!: FormGroup;
  mode: string = 'Add';
  jobTitle!: JobTitle;
  jobTitleId: any;

  constructor(
    private jobTitleService: JobTitleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.jobTitleForm = this.fb.group({
      title: [null, Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.jobTitleId = params['id'];
      if (this.jobTitleId) {
        this.mode = 'Update';
        this.updateForm(this.jobTitleId);
      }
    });
  }

  patchFormWithData() {
    this.jobTitleForm.patchValue({
      name: this.jobTitle.title,
    });
  }

  getJobTitleById(id?: any) {
    this.jobTitleService.getJobTitleById(id).subscribe((res) => {
      if (res) {
        this.jobTitle = res;
        this.patchFormWithData();
      }
    });
  }

  createFromForm() {
    const formValue = this.jobTitleForm.value;
    const jobTitle: JobTitle = {
      id: this.jobTitleId ? this.jobTitleId : undefined,
      title: formValue.title,
      status: true,
    };
    return jobTitle;
  }

  updateForm(id?: any) {
    this.getJobTitleById(id);
  }

  onSubmit() {
    if (this.jobTitleForm && this.jobTitleForm.valid) {
      this.jobTitle = this.createFromForm();
      if (this.mode == 'Update') {
        this.jobTitleService
          .updateJobTitleById(this.jobTitle.id, this.jobTitle)
          .subscribe({
            next: (res: any) => {
              this.router.navigate([ROUTES.JOB_TITLE_LIST]);
            },
            error: (error) => {
              this.error(error);
            },
          });
      } else {
        this.jobTitleService.addJobTitle(this.jobTitle).subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigate([ROUTES.JOB_TITLE_LIST]);
            }
          },
          error: (error) => {
            this.error(error);
            console.log(error);
          },
        });
      }
    } else {
      this.alert();
    }
  }

  error(error: HttpErrorResponse) {
    if (error.error) {
      const errorMessages = Object.values(error.error);
      if (errorMessages.length > 0) {
        const firstErrorMessage = errorMessages[0] as string;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: firstErrorMessage,
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred.',
      });
    }
  }
  

  alert() {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: 'Please ensure that all required details are filled out.',
    });
  }

  onCancel() {
    this.router.navigate([ROUTES.JOB_TITLE_LIST]);
  }
}
