import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "../interfaces/recipe";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class RecipeService{

    constructor(private http: HttpClient){

    }

    getRecipes(): Observable<Array<Recipe>>{
        console.log('Getting recipes...')
        return this.http.get<Array<Recipe>>('/sample-data/recipes.json')
    }
}