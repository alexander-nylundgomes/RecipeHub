import { inject, Injectable, OnInit, signal, Signal, WritableSignal } from "@angular/core";
import { User } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, take } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UserService{

	http: HttpClient = inject(HttpClient);

	getLoggedInUser(){
		return this.http.get<User>('/sample-data/user.json');
	}
	
	getUser(userId: number){
		return this.http.get<User>(`/sample-data/users/${userId}.json`);
	}

	getFollowsUsers(){
		return this.http.get<User[]>('/sample-data/following.json');
	}
	
	getLikes(){
		return this.http.get<number[]>('/sample-data/likes.json');
	}
}