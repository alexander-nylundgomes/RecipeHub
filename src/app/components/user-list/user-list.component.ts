import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  users: {id: number, firstName: string, lastName: string}[] = [
    {id: 1, firstName: "Jane", lastName: "Doe"},
    {id: 2, firstName: "William", lastName: "Doe"},
    {id: 3, firstName: "Stephan", lastName: "Doe"},
  ]

}
