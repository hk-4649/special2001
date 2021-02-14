const request = require('request');

const requestEx = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, _, body) => {
            if (err) {
                reject(new Error('祝日の取得に失敗しました。'));
            }
            resolve(body);
        });
    });
};

module.exports.getPublicHolidays = async() => {
    const dt = new Date();
    const year = dt.getFullYear();
    const publicHolidaysHost = `https://holidays-jp.github.io/api/v1/${year}/date.json`;
    try {
        const holidaysJson = await requestEx(publicHolidaysHost);
        const holidays = JSON.parse(holidaysJson);
        const result = [];
        for (const [key, value] of Object.entries(holidays)) {
            result.push({
                date: key.replace(/-/g, ''),
                name: value,
            });
        }
        return result;
    }
    catch (e) {
        console.log(e);
        return 'no data';
    }
};
