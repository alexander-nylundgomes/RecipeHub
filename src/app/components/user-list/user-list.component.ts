import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import { EMPTY, map, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { selectFollowsUsers } from '../../state/users/users.selectors';
import { UserActions } from '../../state/users/users.actions';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AvatarComponent, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy{
  
  store: Store = inject(Store);
  users: InputSignal<User[]> = input.required();
  router: Router = inject(Router);
  followsUsers$: Observable<ReadonlyArray<User>> = EMPTY;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  ngOnInit(): void {
    this.followsUsers$ = this.store.select(selectFollowsUsers).pipe(takeUntil(this.destroyed$))
  }

  isFollowing(userId: number): Observable<boolean>{
    return this.followsUsers$.pipe(map(users => users.some(user => user.id === userId)))
  }

  goToUser(user: User){
    this.router.navigate(['user', user.id]);
  }

  toggleFollow(user: User){
    this.isFollowing(user.id).pipe(take(1)).subscribe((follows) => {
      if(follows){
        this.store.dispatch(UserActions.unfollowUser({ id: user.id }))
      }else{
        this.store.dispatch(UserActions.followUser({ user }))
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
