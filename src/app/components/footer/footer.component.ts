import { Component, computed, effect, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { pipe, ReplaySubject, switchMap, take, takeUntil, } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Actions, ofType } from '@ngrx/effects';
import { UserApiActions } from '../../state/users/users.actions';
import { select, Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../state/users/users.selectors';

interface FooterButton{
  icon: string, 
  text: string, 
  selected: boolean, 
  url: string
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy{

  actions$: Actions = inject(Actions);
  store: Store = inject(Store);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  buttons: FooterButton[] = [];


  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      if(event.type == EventType.NavigationEnd){
        this.buttons.forEach((button) => {
          button.selected = button.url == this.router.url;
        })
      }
    });

    this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.buttons = [
        {icon: "bi-house-fill", text: "Home", selected: true, url: "/"},
        {icon: "bi-heart-fill", text: "Likes", selected: false, url: `/user/${user?.id}/likes`},
        {icon: "bi-person-fill", text: "Following", selected: false, url: `/user/${user?.id}/following`},
        {icon: "bi-gear-fill", text: "Settings", selected: false, url: "/settings"},
      ];

      this.buttons.forEach((button) => {
        button.selected = button.url == this.router.url;
      })
    })
  }

  buttonClick(button: FooterButton){
    this.router.navigateByUrl(button.url);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
