import {Component, OnInit,Input} from '@angular/core';
import {RecipesService} from '../../../services/recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NSLocationStrategy} from 'nativescript-angular/router/ns-location-strategy';
@Component({
    selector: 'recipes-details',
    templateUrl: 'components/recipes/details/details.html',
    providers: [RecipesService],
    styleUrls: ['components/recipes/details/details-common.css', 'components/recipes/details/details.css']
})

export class RecipesDetailsComponent implements OnInit {
    @Input() recipe;
    constructor() {
        console.dump(this.recipe)
    }
    ngOnInit() {}
}