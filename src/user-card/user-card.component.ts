import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  onDeleteClick(user: IUser): void {
    this.deleteUser.emit(user);
  }

}
