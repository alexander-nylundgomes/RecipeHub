import { Component, computed, effect, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { ReplaySubject, takeUntil, } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

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

  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  buttons: FooterButton[] = [];


  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      if(event.type == EventType.NavigationEnd){
        this.setButtons();
      }
    });

    this.userService.loggedInUser$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.setButtons();
    })
  }

  setButtons(){
    this.buttons = [
      {icon: "bi-house-fill", text: "Home", selected: true, url: "/"},
      {icon: "bi-heart-fill", text: "Likes", selected: false, url: `/user/${this.userService.loggedInUser$.getValue()?.id}/likes`},
      {icon: "bi-person-fill", text: "Following", selected: false, url: `/user/${this.userService.loggedInUser$.getValue()?.id}/following`},
      {icon: "bi-gear-fill", text: "Settings", selected: false, url: "/settings"},
    ]

    this.buttons.forEach((button) => {
      button.selected = button.url == this.router.url;
    })
  }

  buttonClick(button: FooterButton){
    this.router.navigateByUrl(button.url);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
