import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ILogin } from '../interfaces/ILogin';
import { finalize, map, tap } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import { MessageService } from '../../../services/message.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: ILogin = this.loginForm.getRawValue();
      this.authService.login(user).subscribe();
      this.messageService.showSucces(`Добро пожаловать ${ user.username }!`);
    }
  }

}
