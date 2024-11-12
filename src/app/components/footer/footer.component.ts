import { Component, computed, effect, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, pipe, ReplaySubject, switchMap, take, takeUntil, } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../state/users/users.selectors';
import { ofType } from '@ngrx/effects';

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

  store: Store = inject(Store);
  router: Router = inject(Router);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  buttons: FooterButton[] = [];

  ngOnInit(): void {

    // Every time a router event of NavigationEnd fires, 
    // we need to update what button should be activated
    this.router.events.pipe(
      filter(event => event.type == EventType.NavigationEnd), 
      takeUntil(this.destroyed$)).subscribe(() => this.setActiveButton());

    // When a user logs in, we must update the URLs of the buttons 
    this.store.select(selectLoggedInUser).pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.buttons = [
        {icon: "bi-house-fill", text: "Home", selected: true, url: "/"},
        {icon: "bi-heart-fill", text: "Likes", selected: false, url: `/user/${user?.id}/likes`},
        {icon: "bi-people-fill", text: "Following", selected: false, url: `/user/${user?.id}/following`},
        {icon: "bi-person-fill", text: "Your profile", selected: false, url: `/user/${user?.id}`},
      ];

      this.setActiveButton();
    })
  }

  setActiveButton(){
    this.buttons.forEach((button) => {
      button.selected = (button.url == this.router.url);
    })
  }

  buttonClick(button: FooterButton){
    this.router.navigateByUrl(button.url);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
