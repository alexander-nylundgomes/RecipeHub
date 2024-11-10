import { AsyncPipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { Recipe } from '../../interfaces/recipe';
import { EMPTY, map, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRecipes } from '../../state/recipes/recipes.selectors';
import { RecipeCardListComponent } from '../../components/recipe-card-list/recipe-card-list.component';
import { selectFollowsUsers, selectLikedRecipes } from '../../state/users/users.selectors';
import { IsLikedMap } from '../../interfaces/is-liked-map';
import { User } from '../../interfaces/user';
import { UserActions } from '../../state/users/users.actions';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [AvatarComponent, RecipeCardListComponent, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  store: Store = inject(Store);
  router: Router = inject(Router);
  location: Location = inject(Location);
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);

  destroyed$: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  allRecipes$: Observable<ReadonlyArray<Recipe>> = EMPTY;
  likedRecipes$: Observable<ReadonlyArray<number>> = EMPTY;
  followsUsers$: Observable<ReadonlyArray<User>> = EMPTY;
  
  user?: User = undefined;
  isLikedMap: IsLikedMap = {};
  userId: number = -1;

  ngOnInit(): void {
    this.allRecipes$ = this.store.select(selectRecipes);
    this.likedRecipes$ = this.store.select(selectLikedRecipes)

    // A change in likes has occurred. Update the map
    this.likedRecipes$.pipe(takeUntil(this.destroyed$)).subscribe((likes) => {
      this.isLikedMap = {};
      likes.forEach((likedRecipeId) => {
        this.isLikedMap[likedRecipeId] = true;
      })
    })

    this.userId = this.route.snapshot.params['id'];

    this.followsUsers$ = this.store.select(selectFollowsUsers);

    // Since the user probably wont change while we're on the profile page,
    // there is no need to store the user as an observable
    this.userService.getUser(this.userId).pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  isFollowing(): Observable<boolean>{
    return this.followsUsers$.pipe(map(users => users.some(user => user.id == this.userId)))
  }

  toggleFollows(){
    this.isFollowing().pipe(take(1)).subscribe((isFollowing) => {
      console.log(isFollowing, this.user)

      if(!this.user){
        return;
      }
      
      if(isFollowing){
        this.store.dispatch(UserActions.unfollowUser( { id: this.user.id } ));
      }else{
        this.store.dispatch(UserActions.followUser( { user: this.user } ));
      }
    })
  }
}
