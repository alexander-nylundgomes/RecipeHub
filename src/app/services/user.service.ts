import { Injectable, OnInit, signal, Signal, WritableSignal } from "@angular/core";
import { User } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, take } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UserService{

	loggedInUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

	constructor(
		private http: HttpClient
	){}


	setUser(){
		this.getUser().pipe(take(1)).subscribe((user: User) => {
			this.loggedInUser$.next(user);
		})
	}

	getUser(){
		return this.http.get<User>('/sample-data/user.json');
	}
}