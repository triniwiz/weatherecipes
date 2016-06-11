/**
 * Created by Osei Fortune on 6/4/16.
 */
import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from 'nativescript-angular/router';
import {WeatherComponent} from './components/weather/weather.component';
import {LocationsComponent} from './components/locations/locations.component';
@Component({
    selector: 'my-app',
    template: '<page-router-outlet></page-router-outlet>',
    directives: [NS_ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/weather', component: WeatherComponent, name: 'Weather', useAsDefault: true },
    { path: '/locations', component: LocationsComponent, name: 'Locations' }
])
export class AppComponent { }


