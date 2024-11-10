import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { select, Store } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { BehaviorSubject, EMPTY, filter, Observable, ReplaySubject, Subscription, switchMap, take, takeUntil } from 'rxjs';
import { selectFollowsUsers, selectFollowsUsersLoaded } from '../../state/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { UserActions, UserApiActions } from '../../state/users/users.actions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit, OnDestroy{
  
  router: Router = inject(Router);
  store: Store = inject(Store);
  actions$: Actions = inject(Actions);
  followsUsersSnapshot: User[] = [];
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  ngOnInit(): void {

    // We don't want to input the observable because if we did that and press the "Unfollow" button,
    // the user would vanish right away. Instead, we take a snapshot. That way, we can give the user the option to "re-follow",
    // if the user pressed "Unfollow" on accident
    this.store.select(selectFollowsUsersLoaded).subscribe((hasFired) => {
      if(hasFired){
        this.store.pipe(select(selectFollowsUsers), take(1)).subscribe((users) => {
          this.followsUsersSnapshot = users; // Capture a snapshot of followsUsers
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
