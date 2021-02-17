const { getPublicHolidays } = require('./getPublicHolidays');
const { getImage } = require('./getImage');

const formatDate = (dt) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return y + m + d;
};
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const imageName = {
    '休日0': 'weekEnd.png',
    '休日1': 'picnic.png',
    '休日2': 'sports.png',
    '休日3': 'dokusyo.png',
    '平日0': 'weekDay.png',
    '平日1': 'kaisya.png',
    '平日2': 'skip.png',
    '平日3': 'roudousya.png',
    '平日4': 'sagyou.png',
    '元日': 'newYear.png',
    '成人の日': 'seijin.png',
    '建国記念の日': 'kenkoku.png',
    '天皇誕生日': 'emperor.png',
    '春分の日': 'spring.png',
    '昭和の日': 'showa.png',
    '憲法記念日': 'kenpo.png',
    'みどりの日': 'green.png',
    'こどもの日': 'children.png',
    '海の日': 'sea.png',
    '体育の日': 'health.png',
    '山の日': 'mountain.png',
    '敬老の日': 'silver.png',
    '秋分の日': 'autumn.png',
    '文化の日': 'culture.png',
    '勤労感謝の日': 'labor.png',
};

module.exports.getTodaysImage = async(dateStr) => {
    try {
        const date = new Date(dateStr);
        const publicHolidays = await getPublicHolidays();
        const yyyymmdd = formatDate(date);
        const publicHoliday = publicHolidays.find((e) => e.date === yyyymmdd);
        if (publicHoliday) {
            const image_name = imageName[publicHoliday.name] || 'furikae.png';
            return {
                image_name,
                image_data: await getImage(image_name),
            };
        }
        const day = date.getDay();
        // 土曜か日曜
        if (day === 0 || day === 6) {
            const n = getRandomInt(4);
            const image_name = imageName[`休日${n}`];
            return {
                image_name,
                image_data: await getImage(image_name),
            };
        }
        const n = getRandomInt(4);
        const image_name = imageName[`平日${n}`];
        return {
            image_name,
            image_data: await getImage(image_name),
        };
    }
    catch (e) {
        console.log(e);
        return {
            image_name: 'no image',
            image_data: '',
        }
    };
};
console.log(getRandomInt(3))