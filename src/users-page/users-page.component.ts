import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../services/loader.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { delay, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  private userService: UserService = inject(UserService);
  private loaderService: LoaderService = inject(LoaderService);
  userList$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

}
