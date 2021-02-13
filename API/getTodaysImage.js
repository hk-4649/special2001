const { getPublicHolidays } = require('./getPublicHolidays');

const formatDate = (dt) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return y + m + d;
};

module.exports.getTodaysImage = async(dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    // 土曜か日曜
    if (day === 0 || day === 6) {
        return '休日';
    }
    const publicHolidays = await getPublicHolidays();
    const yyyymmdd = formatDate(date);
    const publicHoliday = publicHolidays.find((e) => e.date === yyyymmdd);
    if (publicHoliday) {
        return publicHoliday.name;
    }
    return '平日';
};
