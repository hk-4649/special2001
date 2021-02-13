'use strict';
const { getPublicHolidays } = require('./API/getPublicHolidays');
const { getTodaysImage } = require('./API/getTodaysImage');
module.exports.publicHolidays = async (event) => {
  const publicHolidays = await getPublicHolidays();
  return {
    statusCode: 200,
    body: JSON.stringify(publicHolidays),
  };
};

module.exports.todaysImage = async (event) => {
  const { date } = JSON.parse(event.body);
  const todaysImage = await getTodaysImage(date);
  return {
    statusCode: 200,
    body: JSON.stringify({image: todaysImage}),
  };
};