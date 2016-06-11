import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
@Component({
    selector: 'page-router-outlet',
    templateUrl: 'components/recipes/recipes.html',
    providers: [RecipesService]
})

export class RecipesComponent implements OnInit {
    recipes;
    type;
    constructor(private recipesService: RecipesService) {

    }
    ngOnInit() {
        this.load();
    }
    load() {
        this.recipesService.getRecipes(this.type)
            .subscribe(
            (res) => { this.recipes = [...res] },
            (err) => { console.log(err) }
            )
    }

}