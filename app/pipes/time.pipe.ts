import {Pipe, PipeTransform} from '@angular/core';
var moment = require('moment');
@Pipe({
    name: 'time'
})

export class TimePipe implements PipeTransform {
    transform(value, args) {
        if (value) {
            return moment(value * 1000).format(args);
        }
    }
}