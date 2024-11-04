import { Injectable, signal, WritableSignal } from "@angular/core";
import { AlertType } from "../enums/alert-type";
import { BehaviorSubject } from "rxjs";
import { Alert } from "../interfaces/alert";

@Injectable({
	providedIn: "root"
})
export class AlertService{

	constructor() { }

	alerts:  WritableSignal<Array<Alert>> = signal([]);
  
	addAlert(alert: Alert){
		alert.id = this.randomId();
		this.alerts.update(alerts => [alert, ...alerts])
	}
  
	removeAlert(id: number){
	  this.alerts.update(alerts => alerts.filter(alert => alert.id != id))
	}

	private randomId(): number{
		return Math.floor(Math.random() * 100000000);
	}
}