import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NSLocationStrategy} from 'nativescript-angular/router/ns-location-strategy';
import {RecipesDetailsComponent} from './details/details.component';
import {StackLayout} from 'ui/layouts/stack-layout';
import utils = require("utils/utils");
import color = require("color");
import app = require("application");
import dialogs = require("ui/dialogs");
import * as Batch from 'nativescript-batch';
@Component({
    selector: 'recipes',
    templateUrl: 'components/recipes/recipes.html',
    providers: [RecipesService],
    styleUrls: ['components/recipes/recipes-common.css', 'components/recipes/recipes.css'],
    directives: [RecipesDetailsComponent]
})

export class RecipesComponent implements OnInit, OnDestroy {
    recipe: any;
    type;
    loading;
    showDetails;
    hasDetails;
    details: any;
    @ViewChild("sv") sv: ElementRef;
    constructor(private locationStrategy: NSLocationStrategy, private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {
    }
    ngOnInit() {
        this.recipe = global.selectedRecipe;
        this.showDetails = false;
        this.hasDetails = false;
    }
    ngOnDestroy() {
        console.log(global.selectedRecipe)
        global.selectedRecipe = null;
    }
    loadRecipe() { }
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
        //Fix crash caused by opened google chrome instance
        if (Boolean(this.recipe && this.recipe.spoonacularSourceUrl)) {
            var url = this.recipe.spoonacularSourceUrl;
            var builder = new android.support.customtabs.CustomTabsIntent.Builder();
            builder.setToolbarColor(new color.Color("#607D8B").android);
            builder.setShowTitle(true);
            var customTabsIntent = builder.build();
            customTabsIntent.launchUrl(app.android.foregroundActivity, android.net.Uri.parse(url));
        } else if (Boolean(this.recipe && this.recipe.sourceUrl)) {
            var url = this.recipe.sourceUrl;
            var builder = new android.support.customtabs.CustomTabsIntent.Builder();
            builder.setToolbarColor(new color.Color("#607D8B").android);
            builder.setShowTitle(true);
            var customTabsIntent = builder.build();
            customTabsIntent.launchUrl(app.android.foregroundActivity, android.net.Uri.parse(url));
        } else {
            dialogs.alert({
                title: 'Sorry',
                message: 'This recipe is unavailable'
            })
        }
    }
}