/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dayToName'
})

export class DayToNamePipe implements PipeTransform {
    transform(value) {
        if (value === 'Mon') {
            return 'Monday'
        } else if (value === 'Tue') {
            return 'Tuesday'
        } else if (value === 'Wed') {
            return 'Wednesday'
        } else if (value === 'Thu') {
            return 'Thursday'
        } else if (value === 'Fri') {
            return 'Friday'
        } else if (value === 'Sat') {
            return 'Saturday'
        } else if (value === 'Sun') {
            return 'Sunday'
        }
    }
}