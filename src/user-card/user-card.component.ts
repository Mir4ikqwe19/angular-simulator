import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { faRectangleXmark, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-user-card',
  imports: [FaIconComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  faRectangleXmark: IconDefinition = faRectangleXmark;

  onDeleteClick(user: IUser): void {
    this.deleteUser.emit(user);
  }

}
