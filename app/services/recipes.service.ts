import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import config = require('../config');
let api = config.SERVER_API;
@Injectable()
export class RecipesService {

    constructor(private http: Http) { }

    getDrinks(type): Observable<any> {
        return this.http.get(`${api}/api/recipes/drinks/${encodeURI(type)}`)
    }
    getRecipeDetails(id: string) {
        return this.http.get(`${api}/api/recipes/getRecipe?drinkId=${id}`)
    }


}