
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
};

export default new Timing();

