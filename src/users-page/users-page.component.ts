import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, delay, filter, map, Observable, Subject, tap } from 'rxjs';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";

@Component({
  selector: 'app-users-page',
  imports: [UserCardComponent, AsyncPipe, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userList$: Observable<IUser[]> = this.userService.users$;
  filteredUsers$: Observable<IUser[]> = new Observable();

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

  ngOnInit(): void {
    this.filteredUsers$ = combineLatest([this.userList$, this.filterSubject])
      .pipe(
        map(([users, filter]) => {
          const lowerCaseFilter: string = filter.toLowerCase();
          return users.filter((user: IUser) => user.name.toLowerCase().includes(lowerCaseFilter));
        })
      );
  }

  deleteUser(user: IUser): void {
    this.userService.deleteUser(user.id);
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
  }

  filterUsers(value: string): void {
    this.filterSubject.next(value);
  }

}
