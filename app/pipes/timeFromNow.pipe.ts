import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'timeFromNow'
})

export class TimeFromNowPipe implements PipeTransform {
    transform(time) {
        if (time) {
            if (time.indexOf('AM') > -1) {
                let char = time.indexOf('AM');
                let newTime = new Date(time.substr(0, char + 2));
                return moment(newTime).fromNow();
            } else {
                let char = time.indexOf('PM')
                let newTime = new Date(time.substr(0, char + 2));
                return moment(newTime).fromNow();
            }
        }
    }
}