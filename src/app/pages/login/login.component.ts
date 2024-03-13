import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../core/services/login.service';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    
    if (this.loginForm.valid) {
      console.log('Form submitted');
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
      
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          localStorage.setItem("token", res.jwt);
          this.router.navigateByUrl(ROUTES.HOME);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.showError(error.error.error);
        }
      });
    } else {
      console.log('Form is invalid');
      // Show toast for empty fields
      this.showError('Please fill in all required fields.');
    }
  }
  

  showError(errorMessage: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
  }
}
