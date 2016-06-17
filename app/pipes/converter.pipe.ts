import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'speed'
})
export class SpeedConverterPipe implements PipeTransform {
    transform(value, args) {
        // console.dump(args.units)
        return value;
    }
}

@Pipe({
    name: 'precipitation'
})
export class PrecipitationConverterPipe implements PipeTransform {
    transform(value, args) {
        if (typeof value == 'number') {
           
           console.log(args)
            if (value > 0) {

            } else {
                return '¯\_(ツ)_/¯'
            }
        }
    }
}