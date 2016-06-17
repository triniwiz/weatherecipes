import {Pipe, PipeTransform} from '@angular/core';
var moment = require('moment')
@Pipe({
    name: 'high'
})
export class HighTemperaturePipe implements PipeTransform {
    transform(value) {
        if (value) {
            let temp = [];
            value.data.forEach((item) => {
                if (moment().isSame(moment(item.time * 1000), 'day')) {
                    temp.push(item.temperature);
                }
            })
            return Math.floor(Math.max.apply(null, temp))
        }
    }
}