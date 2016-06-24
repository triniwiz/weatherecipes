import {nsProvideRouter} from 'nativescript-angular/router';
import {WeatherComponent} from './components/weather/weather.component';
import {LocationsComponent} from './components/locations/locations.component';
import {DailyComponent} from './components/daily/daily.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {RouterConfig, Route} from '@angular/router';
export const Routes: RouterConfig = [
    {
        path: '', component: TabsComponent, children: [
            { path: '', component: WeatherComponent },
            { path: 'locations', component: LocationsComponent },
            { path: 'daily', component: DailyComponent }
        ]
    },
    { path: 'settings', component: SettingsComponent }

];
