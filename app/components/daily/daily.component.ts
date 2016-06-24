import {Component, OnInit, OnDestroy} from '@angular/core';
/*Pipes*/
import {TNSFontIconService, TNSFontIconPipe} from 'nativescript-ng2-fonticon';
import {TimePipe} from '../../pipes/time.pipe';
import {TemperaturePipe} from '../../pipes/temperature.pipe';
@Component({
    selector: 'daily',
    templateUrl: 'components/daily/daily.html',
    pipes: [
        TNSFontIconPipe,
        TimePipe,
        TemperaturePipe
    ]
})

export class DailyComponent implements OnInit, OnDestroy {
    constructor(private fonticon: TNSFontIconService) { }
    ngOnInit() { }
    ngOnDestroy() { }
}