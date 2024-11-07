import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-in-focus',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './in-focus.component.html',
  styleUrl: './in-focus.component.scss'
})
export class InFocusComponent {

}
