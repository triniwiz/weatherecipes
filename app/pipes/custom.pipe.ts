import {Pipe, PipeTransform} from '@angular/core';
import settings = require("application-settings");
var moment = require('moment');
@Pipe({
    name: 'speed'
})
export class SpeedConverterPipe implements PipeTransform {
    transform(value, args) {
        console.dump(args)
        console.log(value)
        return value;
    }
}

@Pipe({
    name: 'precipitation'
})
export class PrecipitationConverterPipe implements PipeTransform {
    transform(value, args) {
        if (typeof value == 'number') {

            if (value > 0) {
                return value * 100 +'%';
            } else {
                return '¯\_(ツ)_/¯'
            }
        }
    }
}

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
@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
    transform(time) {
        if (time) {
            return moment(time).fromNow();
        }
    }
}
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
@Pipe({
    name: 'weathericon'
})

export class WeatherPipe implements PipeTransform {
    transform(value) {
        if (value) {
            if (value === 'clear-day') {
                return 'wi-forecast-io-clear-day'
            } else if (value === 'clear-night') {
                return 'wi-forecast-io-clear-night'
            } else if (value === 'rain') {
                return 'wi-forecast-io-rain'
            } else if (value === 'snow') {
                return 'wi-forecast-io-snow'
            } else if (value === 'sleet') {
                return 'wi-forecast-io-sleet'
            } else if (value === 'strong-wind') {
                return 'wi-forecast-io-wind'
            } else if (value === 'fog') {
                return 'wi-forecast-io-fog'
            } else if (value === 'cloudy') {
                return 'wi-forecast-io-cloudy'
            } else if (value === 'partly-cloudy-day') {
                return 'wi-forecast-io-partly-cloudy-day'
            } else if (value === 'partly-cloudy-night') {
                return 'wi-forecast-io-partly-cloudy-night'
            } else if (value === 'hail') {
                return 'wi-forecast-io-hail'
            } else if (value === 'thunderstorm') {
                return 'wi-forecast-io-thunderstorm'
            } else if (value === 'tornado') {
                return 'wi-forecast-io-tornado'
            }

        }
    }
}
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

@Pipe({
    name: 'isSelected'
})

export class IsSelectedPipe implements PipeTransform {
    transform(value) {
        if (value && settings.getString("selected")) {
            return value === settings.getString("selected");
        }
    }
}

@Pipe({
    name: 'visibility'
})

export class VisibilityPipe implements PipeTransform {
    transform(value, args) {
        if (value && args) {
            const units = { us: 'm', si: 'km', ca: 'km', uk2: 'm' };
            return `${Math.floor(Math.round(value))}${units[args.flags.units]}`
        }
    }
}

@Pipe({
    name: 'pressure'
})

export class PressurePipe implements PipeTransform {
    transform(value) {
        if (value) {
            return Math.floor(Math.round(value));
        }
    }
}

@Pipe({
    name: 'cloudCover'
})

export class CloudCoverPipe implements PipeTransform {
    transform(value) {
        if (value) {
            return Math.floor(Math.round(value * 100));
        }
    }
}

