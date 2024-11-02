import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "../interfaces/recipe";
import { HttpClient } from "@angular/common/http";
import { Measurement } from "../interfaces/measurement";

@Injectable({
    providedIn: "root"
})
export class RecipeService{

    constructor(private http: HttpClient){

    }

    getRecipes(): Observable<Array<Recipe>>{
        return this.http.get<Array<Recipe>>('/sample-data/recipes.json')
    }

    getMeasurements(): Observable<Array<Measurement>>{
        return this.http.get<Array<Measurement>>('/sample-data/measurements.json')
    }


}