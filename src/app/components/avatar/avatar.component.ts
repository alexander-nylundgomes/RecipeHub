import { Component, Input, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

  size: InputSignal<("S" | "M" | "L")> = input("M" as ("S" | "M" | "L"));
  userId: InputSignal<number> = input(1);
}
