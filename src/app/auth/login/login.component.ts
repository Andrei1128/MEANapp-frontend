import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pwError: boolean;
  emailError: boolean;
  rememberMe: boolean;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  toRegister(): void {
    this.router.navigate(['auth/register']);
  }

  login(): void {
    this.pwError = false;
    this.emailError = false;
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    const payload = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService.login(payload).subscribe({
      next: (res) => {
        if (this.rememberMe) {
          window.localStorage['token'] = res;
        } else {
          window.sessionStorage['token'] = res;
        }
        this.router.navigate(['dashboard']);
      },
      error: (e: any) => {
        if (e.error === 'Email not found!') this.emailError = true;
        else if (e.error === 'Wrong password!') this.pwError = true;
      },
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
