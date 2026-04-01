import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, pipe, shareReplay, tap, timeout } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userApi: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApi.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось загрузить.');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
  }
}
