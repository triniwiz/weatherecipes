/**
 * Created by Osei Fortune on 6/6/16.
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'windDirection'
})

export class WindDirectionPipe implements PipeTransform {
    transform(value) {
const d = 'wi-towards-';
        if (value >= 348.75 && value <= 11.25) {
            return d+d+'n';
        } else if (value > 11.25 && value <= 33.75) {
            return d+'nne';
        } else if (value > 33.75 && value <= 56.25) {
            return d+'ne';
        } else if (value > 56.25 && value <= 78.75) {
            return d+'ene';
        }
        else if (value > 78.75 && value <= 101.25) {
            return d+'e';
        }
        else if (value > 101.25 && value <= 123.75) {
            return d+'ese';
        }
        else if (value > 123.75 && value <= 146.25) {
            return d+'se';
        }
        else if (value > 146.25 && value <= 168.75) {
            return d+'sse';
        } else if (value > 168.75 && value <= 191.25) {
            return d+'s';
        }
        else if (value > 191.25 && value <= 213.75) {
            return d+'ssw';
        }
        else if (value > 213.75 && value <= 236.25) {
            return d+'sw';
        }
        else if (value > 236.25 && value <= 258.75) {
            return d+'wsw';
        }
        else if (value > 258.75 && value <= 281.25) {
            return d+'w';
        }
        else if (value > 281.25 && value <= 303.75) {
            return d+'wnw';
        } else if (value > 303.75 && value <= 326.25) {
            return d+'nw';
        } else if (value > 326.25 && value < 348.75) {
            return d+'nnw';
        }


    }
}