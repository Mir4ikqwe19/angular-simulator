import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { faRectangleXmark, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { PhonePipe } from '../pipes/phone.pipe';
import { HoverDirective } from "../directives/hover.directive";
import { PhoneMode } from '../enums/Phone';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhonePipe, HoverDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  faRectangleXmark: IconDefinition = faRectangleXmark;
  phoneMode: typeof PhoneMode = PhoneMode;

  onDeleteClick(user: IUser): void {
    this.deleteUser.emit(user);
  }

}
