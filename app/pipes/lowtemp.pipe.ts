import {Pipe, PipeTransform} from '@angular/core';
var moment = require('moment');
@Pipe({
    name: 'low'
})
export class LowTemperaturePipe implements PipeTransform {
    transform(value) {
        if (value) {
            let temp = [];
            value.data.forEach((item) => {
                if (moment().isSame(moment(item.time * 1000), 'day')) {
                    temp.push(item.temperature);
                }
            })
            return Math.floor(Math.min.apply(null, temp))
        }
    }
}