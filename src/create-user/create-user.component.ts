import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { MessageService } from '../services/message.service';
import { HoverDirective } from "../directives/hover.directive";
import { GradientDirective } from '../directives/gradient.directive';
import { IGradientConfiguration } from '../interfaces/IGradient';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, HoverDirective, GradientDirective],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);

  inputConfiguratioun: IGradientConfiguration = {
    colors: ['var(--p-rose-800), var(--p-sky-600), var(--p-cyan-600), var(--p-neutral-300)'],
    thickness: '3px'
  }

  createUserForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(25)]],
    website: ['', Validators.maxLength(100)],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      }),
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.maxLength(200)]],
      bs: ['', [Validators.maxLength(100)]]
    })
  });

  onSubmit(): void {
    if (this.createUserForm.valid) {
      const newUser: IUser = { ...this.createUserForm.getRawValue(), id: Date.now() };
  
      this.createUser.emit(newUser);
      this.messageService.showSucces('Пользователь создан!');
      this.createUserForm.reset();
    } else {
      this.messageService.showError('Не все поля заполнены!');
    }
  }

}
