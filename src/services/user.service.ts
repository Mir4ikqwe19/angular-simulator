import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, pipe, shareReplay, tap, timeout } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userApi: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setValue('users', users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];

    this.setUsers(updatedUsers);
  }

  deleteUser(id: number): void {
    const currentUser: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = currentUser.filter((user: IUser) => user.id !== id);
    
    this.setUsers(updatedUsers);
  }

  loadUsers(): Observable<IUser[]> {
    const usersFromStorage: IUser[] = this.localStorageService.getValue<IUser[]>('users') || [];

    if (usersFromStorage.length) {
      this.setUsers(usersFromStorage);
      return of(usersFromStorage);
    } else {
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
  
}
