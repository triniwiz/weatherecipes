// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {WeatherComponent} from "./components/weather/weather.component";
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core'
import {WeatherService} from './services/weather.service';
import {TNSFontIconService} from 'nativescript-ng2-fonticon';
import {registerElement} from "nativescript-angular/element-registry"
registerElement("ImageCacheIt", () => require("nativescript-image-cache-it").ImageCacheIt);
registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("PullToRefresh", () => require('nativescript-pulltorefresh').PullToRefresh)
nativeScriptBootstrap(WeatherComponent, [HTTP_PROVIDERS, WeatherService, provide(TNSFontIconService, {
  useFactory: () => {
    return new TNSFontIconService({
      'wi': 'weather-icons.css'
    });
  }
})]);