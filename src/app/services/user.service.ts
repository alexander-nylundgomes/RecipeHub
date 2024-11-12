import { inject, Injectable, OnInit, signal, Signal, WritableSignal } from "@angular/core";
import { User } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, filter, find, map, Observable, take } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UserService{

	http: HttpClient = inject(HttpClient);

	getLoggedInUser(){
		return this.http.get<User>('/sample-data/logged-in-user.json');
	}
	
	getUser(userId: number): Observable<User | undefined>{
		return this.http.get<User[]>(`/sample-data/users.json`).pipe(map((users: User[]) => users.find(user => user.id === userId)));
	}

	getFollowsUsers(){
		return this.http.get<User[]>('/sample-data/following.json');
	}
	
	getLikes(){
		return this.http.get<number[]>('/sample-data/likes.json');
	}
}