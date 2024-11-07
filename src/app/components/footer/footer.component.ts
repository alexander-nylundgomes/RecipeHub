import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  buttons: {icon: string, text: string, selected: boolean}[] = [
    {icon: "bi-house-fill", text: "Home", selected: true},
    {icon: "bi-heart-fill", text: "Likes", selected: false},
    {icon: "bi-person-fill", text: "Following", selected: false},
    {icon: "bi-gear-fill", text: "Settings", selected: false},
  ]

}
