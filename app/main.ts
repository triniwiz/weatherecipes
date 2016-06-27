import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core'
import {TNSFontIconService} from 'nativescript-ng2-fonticon';
import {registerElement} from "nativescript-angular/element-registry";
import app = require('application');
import geolocation = require("nativescript-geolocation");
import {nsProvideRouter} from 'nativescript-angular/router';
import {Routes} from './routes';
import {DBService} from './services/db.service';
import {WeatherService} from './services/weather.service';
import {RecipesService} from './services/recipes.service';
import {SearchService} from './services/search.service';
import {CouchBaseDB} from './couchbase.db';
registerElement("ImageCacheIt", () => require("nativescript-image-cache-it").ImageCacheIt);
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("PullToRefresh", () => require('nativescript-pulltorefresh').PullToRefresh);
registerElement("RadCartesianChart", () => require('nativescript-telerik-ui-pro/chart').RadCartesianChart);
registerElement("SplineSeries", () => require('nativescript-telerik-ui-pro/chart').SplineSeries);
registerElement("DropDown", () => require('nativescript-drop-down').DropDown);
registerElement("AwesomeLoaders", () => require('nativescript-awesome-loaders').AwesomeLoaders);
import {Couchbase} from 'nativescript-couchbase';
import settings = require("application-settings");
app.on(app.launchEvent, () => {
  if (settings.getBoolean("autoLocation") === undefined) {
    settings.setBoolean("autoLocation", true);
  }


})
///// HACK - fix dom adapter
import {Parse5DomAdapter} from '@angular/platform-server/src/parse5_adapter';
(<any>Parse5DomAdapter).prototype.getCookie = function (name) { return null; };
///// HACK - fix dom adapter

nativeScriptBootstrap(AppComponent, [
  nsProvideRouter(Routes, { enableTracing: false }),
  HTTP_PROVIDERS,
  DBService,
  RecipesService,
  WeatherService,
  SearchService,
  CouchBaseDB,
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'wi': 'weather-icons.css',
        'fa': 'font-awesome.css'
      });
    }
  })]);