import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {provide} from '@angular/core'
import {TNSFontIconService} from 'nativescript-ng2-fonticon';
import {registerElement} from "nativescript-angular/element-registry";
import app = require('application');
import geolocation = require("nativescript-geolocation");
import {nsProvideRouter} from 'nativescript-angular/router';
import {Routes} from './routes';
import {DBService} from './services/db.service';
import {WeatherService} from './services/weather.service';
registerElement("ImageCacheIt", () => require("nativescript-image-cache-it").ImageCacheIt);
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("PullToRefresh", () => require('nativescript-pulltorefresh').PullToRefresh);
registerElement("RadCartesianChart", () => require('nativescript-telerik-ui-pro/chart').RadCartesianChart);
registerElement("SplineSeries", () => require('nativescript-telerik-ui-pro/chart').SplineSeries);
nativeScriptBootstrap(AppComponent, [
  nsProvideRouter(Routes, { enableTracing: false }),
  HTTP_PROVIDERS,
  DBService,
  WeatherService,
  provide(TNSFontIconService, {
    useFactory: () => {
      return new TNSFontIconService({
        'wi': 'weather-icons.css',
        'fa': 'font-awesome.css'
      });
    }
  })]);