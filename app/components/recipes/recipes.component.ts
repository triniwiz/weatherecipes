import {Component, OnInit} from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NSLocationStrategy} from 'nativescript-angular/router/ns-location-strategy';
@Component({
    selector: 'recipes',
    templateUrl: 'components/recipes/recipes.html',
    providers: [RecipesService],
    styleUrls: ['components/recipes/recipes-common.css', 'components/recipes/recipes.css']
})

export class RecipesComponent implements OnInit {
    recipe: any;
    type;
    constructor(private locationStrategy: NSLocationStrategy, private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {

    }
    ngOnInit() {
        this.route.params
            /*.map(params => params['drink'])*/
            .subscribe((res) => {
                this.recipe = res;
            });
    }
    loadRecipe() {
        this.recipesService.getDrinks(this.type)
            .subscribe(
            (res) => { this.recipe = res },
            (err) => { console.log(err) }
            )
    }
    close() {
        this.locationStrategy.back();
    }
    goToDetails(id) {
        console.log(id)
    }
}