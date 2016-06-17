import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'temperature'
})

export class TemperaturePipe implements PipeTransform {
    transform(value) {
        if (value) {
            return Math.floor(value);
        }
    }
}