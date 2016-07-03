declare var android: any;
declare var com: any;
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NSLocationStrategy} from 'nativescript-angular/router/ns-location-strategy';
import {RecipesDetailsComponent} from './details/details.component';
import {StackLayout} from 'ui/layouts/stack-layout';
import utils = require("utils/utils");
import color = require("color");
import app = require("application")
@Component({
    selector: 'recipes',
    templateUrl: 'components/recipes/recipes.html',
    providers: [RecipesService],
    styleUrls: ['components/recipes/recipes-common.css', 'components/recipes/recipes.css'],
    directives: [RecipesDetailsComponent]
})

export class RecipesComponent implements OnInit {
    recipe: any;
    type;
    loading;
    showDetails;
    hasDetails;
    details: any;
    @ViewChild("sv") sv: ElementRef;
    constructor(private locationStrategy: NSLocationStrategy, private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {
        this.showDetails = false;
        this.hasDetails = false;
        this.recipe = global.selectedRecipe;
    }
    ngOnInit() { }
    loadRecipe() {
        /*this.recipesService.getDrinks(this.type)
            .subscribe(
            (res) => { this.recipe = res },
            (err) => { console.log(err) }
            )*/
    }
    close() {
        this.locationStrategy.back();
    }
    goToDetails(id) {
        /*     let sv: StackLayout = this.sv.nativeElement;
             this.loading = true;
             this.recipesService.getRecipeDetails(id)
                 .subscribe(
                 (res) => {
                     this.hasDetails = true;
                     this.loading = false;
                 },
                 (e) => {
                     console.log(e);
                     this.hasDetails = false;
                     this.loading = false;
                 }
                 )*/
    }

    openUrl() {
        // utils.openUrl(this.recipe.spoonacularSourceUrl);
        if (this.recipe && this.recipe.spoonacularSourceUrl) {
            if (this.recipe.spoonacularSourceUrl.length > 0) {
                var url = this.recipe.spoonacularSourceUrl
                var builder = new android.support.customtabs.CustomTabsIntent.Builder();
                builder.setToolbarColor(new color.Color("#607D8B").android);
                builder.setShowTitle(true);
                var customTabsIntent = builder.build();
                customTabsIntent.launchUrl(app.android.startActivity, android.net.Uri.parse(url));
            } else if (this.recipe.sourceUrl.length > 0) {
                var url = this.recipe.sourceUrl;
                var builder = new android.support.customtabs.CustomTabsIntent.Builder();
                builder.setToolbarColor(new color.Color("#607D8B").android);
                builder.setShowTitle(true);
                var customTabsIntent = builder.build();
                customTabsIntent.launchUrl(app.android.startActivity, android.net.Uri.parse(url));
            }


        }

    }
}