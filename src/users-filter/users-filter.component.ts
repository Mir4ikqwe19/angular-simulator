import { Component, DestroyRef, EventEmitter, inject, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { combineLatest, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  
  private destroyRef: DestroyRef = inject(DestroyRef);

  filterForm: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((value: string) => value.trim().toLowerCase()),
        tap((value: string) => this.filterChange.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
  }

}
