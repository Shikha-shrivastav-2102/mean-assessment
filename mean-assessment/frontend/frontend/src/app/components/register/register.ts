import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
registerForm: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    
  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  }

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert(error.error?.message || 'Registration failed');
      }
    });
  }
}