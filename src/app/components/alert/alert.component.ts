import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { Alert } from '../../interfaces/alert';
import { AlertType } from '../../enums/alert-type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  
  alert: InputSignal<Alert> = input.required<Alert>();
  @Output() onRemove = new EventEmitter<void>();
  readonly AlertType = AlertType;

}
