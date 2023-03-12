import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/_core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showError: boolean;
  showPasswordNotMatch: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  toLogin() {
    this.router.navigate(['auth']);
  }

  register(): void {
    if (this.password.value !== this.checkPassword.value)
      this.checkPassword.setErrors({ required: true });
    if (this.registerForm.invalid) return;
    const payload = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
    this.authService.register(payload).subscribe({
      next: (res) => {
        window.sessionStorage['token'] = res;
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.showError = true;
      },
    });
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value;
    const valid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})/.test(
      password
    );
    if (!valid) return { passwordInvalid: true };
    return null;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get checkPassword(): FormControl {
    return this.registerForm.get('checkPassword') as FormControl;
  }
  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
}
