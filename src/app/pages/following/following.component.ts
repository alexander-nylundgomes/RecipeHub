import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { ReplaySubject, take, takeUntil } from 'rxjs';
import { selectFollowsUsers, selectFollowsUsersLoaded } from '../../state/users/users.selectors';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit, OnDestroy{
  
  store: Store = inject(Store);
  followsUsersSnapshot: User[] = [];
  
  receivedData$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  ngOnInit(): void {

    // We don't want to input the observable because if we did that and press the "Unfollow" button,
    // the user would vanish right away. Instead, we take a snapshot. That way, we can give the user the option to "re-follow",
    // if the user pressed "Unfollow" on accident
    this.store.select(selectFollowsUsersLoaded).pipe(takeUntil(this.receivedData$)).subscribe((hasFired) => {
      if(hasFired){
        this.receivedData$.next(true);
        this.store.select(selectFollowsUsers).pipe(take(1)).subscribe((users) => {
          this.followsUsersSnapshot = users; // Capture a snapshot of followsUsers
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
