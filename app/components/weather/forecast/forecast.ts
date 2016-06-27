/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Component, Input, Pipe, PipeTransform} from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import * as customPipe from '../../../pipes/custom.pipe';
import platform = require('platform');
@Component({
    selector: 'forecast',
    templateUrl: 'components/weather/forecast/forecast.html',
    pipes: [TNSFontIconPipe, customPipe.DayToNamePipe, customPipe.TemperaturePipe, customPipe.WeatherPipe, customPipe.TimePipe],
    styleUrls: ['components/weather/forecast/forecast.css']
})
export class ForecastComponent {
    @Input() weather;
    width;
    constructor(private fonticon: TNSFontIconService) {
        this.width = platform.screen.mainScreen.widthPixels;
    }
}
