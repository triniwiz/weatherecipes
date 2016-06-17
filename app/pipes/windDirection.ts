/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'windDirection'
})

export class WindDirectionPipe implements PipeTransform {
    transform(value) {
        if (value) {
            if (value >= 348.75 && value <= 11.25) { return 'N' }
            if (value > 11.25 && value <= 33.75) { return 'NNE' }
            if (value > 33.75 && value <= 56.25) { return 'NE' }
            if (value > 56.25 && value <= 78.75) { return 'ENE' }
            if (value > 78.75 && value <= 101.25) { return 'E' }
            if (value > 101.25 && value <= 123.75) { return 'ESE' }
            if (value > 123.75 && value <= 146.25) { return 'SE' }
            if (value > 146.25 && value <= 168.75) { return 'SSE' }
            if (value > 168.75 && value <= 191.25) { return 'S' }
            if (value > 191.25 && value <= 213.75) { return 'SSW' }
            if (value > 213.75 && value <= 236.25) { return 'SW' }
            if (value > 236.25 && value <= 258.75) { return 'WSW' }
            if (value > 258.75 && value <= 281.25) { return 'W' }
            if (value > 281.25 && value <= 303.75) { return 'WNW' }
            if (value > 303.75 && value <= 326.25) { return 'NW' }
            if (value > 326.25 && value < 348.75) { return 'NNW' }
        }
    }
}