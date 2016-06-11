// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {provide} from '@angular/core'
import {NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {WeatherService} from './services/weather.service';
import {TNSFontIconService} from 'nativescript-ng2-fonticon';
import {registerElement} from "nativescript-angular/element-registry";
import app = require('application');
import {DBService} from './services/db.service';
import geolocation = require("nativescript-geolocation");
registerElement("ImageCacheIt", () => require("nativescript-image-cache-it").ImageCacheIt);
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("PullToRefresh", () => require('nativescript-pulltorefresh').PullToRefresh);
nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, NS_ROUTER_PROVIDERS, DBService, WeatherService, provide(TNSFontIconService, {
  useFactory: () => {
    return new TNSFontIconService({
      'wi': 'weather-icons.css',
      'material-icons': 'material-icons.css',
      'fa': 'font-awesome.css'
    });
  }
})]);