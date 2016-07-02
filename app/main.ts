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
import {TabsService} from './services/tabs.service';
import {RecipesService} from './services/recipes.service';
import {SearchService} from './services/search.service';
import config = require("./config");
registerElement("ImageCacheIt", () => require("nativescript-image-cache-it").ImageCacheIt);
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("PullToRefresh", () => require('nativescript-pulltorefresh').PullToRefresh);
registerElement("RadCartesianChart", () => require('nativescript-telerik-ui-pro/chart').RadCartesianChart);
registerElement("SplineSeries", () => require('nativescript-telerik-ui-pro/chart').SplineSeries);
registerElement("DropDown", () => require('nativescript-drop-down').DropDown);
registerElement("AwesomeLoaders", () => require('nativescript-awesome-loaders').AwesomeLoaders);
import settings = require("application-settings");
app.on(app.launchEvent, () => {
  if (settings.getBoolean(config.AUTO_LOCATION) === undefined) {
    settings.setBoolean(config.AUTO_LOCATION, true);
  }


})
///// HACK - fix dom adapter
/*import {Parse5DomAdapter} from '@angular/platform-server/src/parse5_adapter';
(<any>Parse5DomAdapter).prototype.getCookie = function (name) { return null; };*/
///// HACK - fix dom adapter

nativeScriptBootstrap(AppComponent, [
  nsProvideRouter(Routes, { enableTracing: false }),
  HTTP_PROVIDERS,
  RecipesService,
  TabsService,
  SearchService,
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'wi': 'weather-icons.css',
        'fa': 'font-awesome.css'
      });
    }
  })]);