import {nsProvideRouter} from 'nativescript-angular/router';
import {WeatherComponent} from './components/weather/weather.component';
import {LocationsComponent} from './components/locations/locations.component';
import {DailyComponent} from './components/daily/daily.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {SearchComponent} from './components/search/search.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RouterConfig} from '@angular/router';
export const Routes: RouterConfig = [
    { path: '', component: TabsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'search', component: SearchComponent },
    { path: 'recipes/:id/:title/:host/:path/:img/:rdy', component: RecipesComponent }

];


/*export const Routes: RouterConfig = [
    {
        path: '', component: TabsComponent, children: [
            { path: '', component: WeatherComponent },
            { path: 'locations', component: LocationsComponent },
            { path: 'daily', component: DailyComponent }
        ]
    },
    { path: 'settings', component: SettingsComponent },
    { path: 'search', component: SearchComponent }

];
*/