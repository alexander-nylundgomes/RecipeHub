import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import { EMPTY, map, Observable, take } from 'rxjs';
import { selectFollowsUsers } from '../../state/users/users.selectors';
import { UserActions } from '../../state/users/users.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AvatarComponent, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  store: Store = inject(Store);
  users: InputSignal<User[]> = input.required();

  followsUsers$: Observable<ReadonlyArray<User>> = EMPTY;

  ngOnInit(): void {
    this.followsUsers$ = this.store.select(selectFollowsUsers)
  }

  isFollowing(userId: number): Observable<boolean>{
    return this.followsUsers$.pipe(map(users => users.some(user => user.id === userId)))
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
}
