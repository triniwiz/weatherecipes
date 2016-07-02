/**
 * Created by Osei Fortune on 6/4/16.
 */
import platform = require('platform');
import {Component, OnInit, OnDestroy, ElementRef, ViewChild, Pipe, PipeTransform, AfterViewInit, Input} from '@angular/core';
import {Page} from 'ui/page';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import * as customPipe from '../../pipes/custom.pipe';
import {View} from 'ui/core/view';
import {Router} from '@angular/router';
import {LocationsComponent} from '../locations/locations.component';
import {SettingsComponent} from '../settings/settings.component';
const flickrRegex = /(https:)(\/\/)(farm)([0-9])/g;
import {RecipesService} from '../../services/recipes.service';
import moment = require("moment");
import settings = require('application-settings');
declare var zonedCallback: Function;
import {Observable} from 'rxjs/Rx';
import {EventData} from 'data/observable';
import {TabView, SelectedIndexChangedEventData} from 'ui/tab-view';
import config = require("../../config");
import * as Batch from "nativescript-batch";
import {Http} from '@angular/http';
import http = require("http")
let api = config.SERVER_API;
@Component({
    selector: 'weather',
    templateUrl: 'components/weather/weather.html',
    providers: [WeatherComponent],
    pipes: [TNSFontIconPipe,
        customPipe.WindDirectionPipe,
        customPipe.TimePipe,
        customPipe.TimeFromNowPipe,
        customPipe.FromNowPipe,
        customPipe.TemperaturePipe,
        customPipe.LowTemperaturePipe,
        customPipe.HighTemperaturePipe,
        customPipe.WeatherPipe,
        customPipe.SpeedConverterPipe,
        customPipe.PrecipitationConverterPipe,
        customPipe.PressurePipe,
        customPipe.VisibilityPipe,
        customPipe.CloudCoverPipe],
    styleUrls: [
        'components/weather/weather-common.css',
        'components/weather/weather.css'
    ]
})
export class WeatherComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() weather;
    isLoading;
    @Input() currentTime;
    @Input() refreshing;
    @Input() location;
    @Input() backgroundImage;
    @Input() timeStamp;
    viewIndex;
    @ViewChild("direction") direction: ElementRef;
    @ViewChild("main") main: ElementRef;
    constructor(private recipesService: RecipesService, private router: Router, private page: Page, private fonticon: TNSFontIconService, private _http: Http) {
        this.viewIndex = 0;
    }

    ngOnInit() { }

    ngAfterViewInit() { }
    ngOnDestroy() { }
    findMeADrink(temp) {
        this.refreshing = true;
        const units = this.weather.flags.units;
        switch (units) {
            case "us":
                if (temp <= 32) {
                    //Too Damned Cold
                    this.showRecipe("hot");
                } else if (temp <= 41 && temp > 32) {
                    //Extremely Cold
                    this.showRecipe("hot");
                } else if (temp <= 50 && temp > 41) {
                    //Very Cold
                    this.showRecipe("hot");
                } else if (temp <= 59 && temp > 50) {
                    //Cold
                    this.showRecipe("hot");
                } else if (temp <= 68 && temp > 59) {
                    //Cool
                    this.showRecipe("cool");
                } else if (temp <= 77 && temp > 68) {
                    //Nice
                    this.showRecipe("nice");
                } else if (temp <= 86 && temp > 77) {
                    //Warm
                    this.showRecipe("cold");
                } else if (temp <= 95 && temp > 86) {
                    //Hot
                    this.showRecipe("icy");
                } else if (temp <= 104 && temp > 95) {
                    //Very Hot
                    this.showRecipe("icy");
                } else if (temp <= 113 && temp > 104) {
                    //Extremely Hot
                    this.showRecipe("icy");
                }
                break;
            case "si":
            case "ca":
            case "uk2":
                if (temp <= 0) {
                    //Too Damned Cold
                    this.showRecipe("hot");
                } else if (temp <= 5 && temp > 0) {
                    //Extremely Cold
                    this.showRecipe("hot");
                } else if (temp <= 10 && temp > 5) {
                    //Very Cold
                    this.showRecipe("hot");
                } else if (temp <= 15 && temp > 10) {
                    //Cold
                    this.showRecipe("hot");
                } else if (temp <= 20 && temp > 15) {
                    //Cool
                    this.showRecipe("cool");
                } else if (temp <= 25 && temp > 20) {
                    //Nice
                    this.showRecipe("nice");
                } else if (temp <= 30 && temp > 25) {
                    //Warm
                    this.showRecipe("cold");
                } else if (temp <= 35 && temp > 30) {
                    //Hot
                    this.showRecipe("icy");
                } else if (temp <= 40 && temp > 35) {
                    //Very Hot
                    this.showRecipe("icy");
                } else if (temp <= 45 && temp > 40) {
                    //Extremely Hot
                    this.showRecipe("icy");
                }
                break;
        }





    }
    showRecipe(params) {
        let id;
        let recipe;
        let that = this

        this._http.get(`${api}/api/recipes/drinks/${encodeURI(params)}`)
            .subscribe(
            (res) => {
                const data = res.json();
                let random_id = Math.floor(Math.random() * data.totalResults);

                that._http.get(`${api}/api/recipes/getRecipe?drinkId=${data.results[random_id].id}`)
                    .subscribe(
                    (res) => {
                        const data = res.json();
                        global.selectedRecipe = data;
                        that.router.navigate(["/recipes"]);
                        that.refreshing = false;
                    },
                    (e) => {
                        console.log(e);
                        that.refreshing = false;
                    }
                    )


            },
            (e) => {
                console.log(e);
                that.refreshing = false;
            })

        /*let b = Batch.newBatch(function (ctx: Batch.IBatchOperationContext) {
            let random;
            let items = [];*/
        /*   http.request({
               url: `${api}/api/recipes/drinks/${encodeURI(params)}`,
               method: 'GET'
           }).then((res) => {
               const data = res.content.toJSON();
               let random_id = Math.floor(Math.random() * data.totalResults);
               ctx.object.set("random", random_id);
               ctx.items.concat(data.results);
               ctx.checkIfFinished();
               console.dump(ctx)
           },
               (e) => {
                   console.log(e);
                   ctx.cancel();
                   ctx.checkIfFinished();
               })
*/

        /* that._http.get(`${api}/api/recipes/drinks/${encodeURI(params)}`)
             .subscribe(
             (res) => {
                 const data = res.json();
                 let random_id = Math.floor(Math.random() * data.totalResults);
                 b.object.set("random", random_id);
                 b.items.concat(data.results);
                 ctx.checkIfFinished();
             },
             (e) => {
                 console.log(e);
                 ctx.cancel();
                 ctx.checkIfFinished();
             })


     }).then(function (ctx) {
         console.log(b.object.get("random"))
         b.object.set("id", b.items.getItem(id));
         ctx.checkIfFinished();
     }).then(function (ctx) {
         that._http.get(`${api}/api/recipes/getRecipe?drinkId=${b.object.get("id")}`)
             .subscribe(
             (res) => {
                 const data = res.json();
                 b.object.set("recipe", data);
                 ctx.checkIfFinished();
             },
             (e) => {
                 console.log(e);
                 ctx.cancel();
                 ctx.checkIfFinished();
             }
             )

     }).whenAllFinished(function (ctx) {
         console.dump(b.object.get("recipe"))
         global.selectedRecipe = b.object.get("recipe");
         that.router.navigate(["/recipes"]);
         that.refreshing = false;
     }).whenCancelled(function () {
         that.refreshing = false;
     })

     b.start();*/

    }

    loaded(event: EventData) { }


    unloaded(event: EventData) { }
}


