/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Component,Input} from '@angular/core';
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {DayToNamePipe} from '../../../pipes/dayToName.pipe'
@Component({
    selector:'forecast',
    templateUrl:'components/weather/forecast/forecast.html',
    pipes: [TNSFontIconPipe,DayToNamePipe],
    styleUrls:['components/weather/forecast/forecast.css']
})
export class ForecastComponent{
    @Input() items;
    constructor(private fonticon: TNSFontIconService){
    }
}