import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { User } from '../../../core/models/user.model';
import { Role } from '../../../core/models/role.model';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [MessageService]
})
export class UserComponent {
  userForm!: FormGroup;
  mode: string = 'Add';
  user!: User;
  roles: Role[] = [];
  userId: any;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]], 
      password: [null, Validators.required],
      roles: [null, Validators.required],
    });

    this.getAllRoles();

    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId) {
        this.mode = 'Update';
        this.updateForm(this.userId);
      }
    });
  }

  patchFormWithData() {
    this.userForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      roles: this.roles != null ? this.roles[0] : "",
    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((res: Role[]) => {
      this.roles = res;
    });
  }

  getUserById(id?: any) {
    this.userService.getUserById(id).subscribe((res) => {
      if (res) {
        this.user = res;
        this.patchFormWithData();
      }
    });
  }

  createFromForm() {
    const formValue = this.userForm.value;
    const user: User = {
      id: this.userId ? this.userId : undefined,
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      roles: [formValue.roles],
      status: true,
    };
    return user;
  }

  updateForm(id?: any) {
    this.getUserById(id);
  }

  onSubmit() {
    if (this.userForm && this.userForm.valid) {
      this.user = this.createFromForm();
      if (this.mode == 'Update') {
        this.userService
          .updateUserById(this.user.id, this.user)
          .subscribe({
            next: (res: any) => {
              this.router.navigate([ROUTES.USER_LIST]);
            },
            error: (error) => {
              this.error(error);
            },
          });
      } else {
        this.userService.addUser(this.user).subscribe({
          next: (res: any) => {
            if (res) {
              this.router.navigate([ROUTES.USER_LIST]);
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
    this.router.navigate([ROUTES.USER_LIST]);
  }
}
