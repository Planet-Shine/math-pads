
class Timing {
    millisecondsMap = null;
    constructor() {
        const millisecondsMap = {};
        millisecondsMap['seconds'] = 1000;
        millisecondsMap['minutes'] = 60 * millisecondsMap['seconds'];
        millisecondsMap['hours'] = 60 * millisecondsMap['minutes'];
        millisecondsMap['dais'] = 24 * millisecondsMap['hours'];
        millisecondsMap['weeks'] = 7 * millisecondsMap['dais'];
        millisecondsMap['years'] = 365 * millisecondsMap['dais'];

        this.millisecondsMap = millisecondsMap;
    }
    isEqualDates(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }
    isEqualMonths(date1, date2) {
        return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }
    addMonths(date, delta) {
        date = new Date(date);
        date.setMonth(date.getMonth() + delta);
        return date;
    }
    getMilliseconds(options) {
        return (Object.keys(options)).reduce((previousValue, currentValue) => {
            return previousValue + (this.millisecondsMap[currentValue] * options[currentValue]);
        }, 0);
    }
    toDate(date) {
        if (typeof date === 'string') {
            date = date.split(' ').map(item => parseInt(item, 10));
            date = new Date(date[0], date[1] - 1, date[2]);
        } else {
            date = null;
        }
        return date;
    }
    toDateString(date) {
        if (date) {
            function getTwoDigits(num) {
                return String(num + 100).slice(-2);
            }
            date = `${date.getFullYear()} ${getTwoDigits(date.getMonth() + 1)} ${getTwoDigits(date.getDate())}`;
        } else {
            date = null;
        }
        return date;
    }
    getNowDateTimestamp() {
        var date = (new Date());
        date = (new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
        return date.getTime();
    }
};

export default new Timing();

