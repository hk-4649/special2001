const { getPublicHolidays } = require('./getPublicHolidays');
const { getImage } = require('./getImage');

const formatDate = (dt) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return y + m + d;
};

const imageName = {
    '休日': 'weekEnd.png',
    '平日': 'weekDay.png',
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
        const date = new Date(dateStr);
        const day = date.getDay();
        // 土曜か日曜
        if (day === 0 || day === 6) {
            const image_name = imageName['休日'];
            return {
                image_name,
                image_data: await getImage(image_name),
            };
        }
        const image_name = imageName['平日'];
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
