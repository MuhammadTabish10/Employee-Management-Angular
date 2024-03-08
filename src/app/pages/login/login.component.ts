import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RouteService } from '../../core/services/route.service';
import { LoginService } from '../../core/services/login.service';

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
    private router: Router,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
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
          // Navigate to HOME route after successful login
          this.router.navigateByUrl(this.routeService.ROUTES.HOME);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Show error message in toast
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
