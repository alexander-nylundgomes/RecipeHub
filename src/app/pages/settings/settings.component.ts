import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, ReplaySubject, take, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user';
import { selectLoggedInUser } from '../../state/users/users.selectors';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type';
import { UserActions } from '../../state/users/users.actions';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [AvatarComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy{
  loggedInUser$: Observable<User | undefined> = EMPTY; 
  destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  
  store: Store = inject(Store);
  formBuilder: FormBuilder = inject(FormBuilder);
  alertService: AlertService = inject(AlertService)

  form: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required]
  })

  editMode: boolean = false;

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select(selectLoggedInUser);
  }

  toggleEditMode(toggledOn: boolean){
    if(toggledOn){
      this.loggedInUser$.pipe(take(1)).subscribe((user) => {
        this.form.patchValue({ 
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email
        });
      })

      this.editMode = true;
    }else{
      this.editMode = false;
    }
  }

  onFormSubmit(){
    if(!this.form.valid){
      this.alertService.addAlert("Not valid!", AlertType.DANGER)
    }else{
      this.loggedInUser$.pipe(take(1)).subscribe((user) => {
        if(!user) return;

        const editedUser: User = {
          ...user,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
        };

        this.store.dispatch(UserActions.editUser({user: editedUser}));
        this.alertService.addAlert("Settings saved!", AlertType.SUCCESS);
        this.toggleEditMode(false);
      })
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
