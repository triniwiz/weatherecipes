import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
let api = '';
@Injectable()
export class RecipesService {

    constructor(private http: Http) { }

    getRecipes(type): Observable<any> {
        return this.http.get(`${api}/api/drinks/${type}`)
            .map(
            (res) => { return res },
            (err) => { return Observable.throw(err) }
            )
    }
    getRecipeDetails(id:string){
        return this.http.get(`${api}/api/drink/${id}`)
            .map(
            (res) => { return res },
            (err) => { return Observable.throw(err) }
            )
    }

}