/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Component,Input} from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
@Component({
    selector:'forecast',
    templateUrl:'components/weather/forecast/forecast.html',
    pipes: [TNSFontIconPipe]
})
export class ForecastComponent{
    @Input() items;
    constructor(private fonticon: TNSFontIconService){
    }
}