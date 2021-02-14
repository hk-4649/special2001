'use strict';
const { getPublicHolidays } = require('./API/getPublicHolidays');
const { getTodaysImage } = require('./API/getTodaysImage');
const { getImage } = require('./API/getImage');

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
    body: JSON.stringify(todaysImage),
  };
};

module.exports.responseImage = async (event) => {
  const { name } = event.queryStringParameters;
  const image = await getImage(`${name}.png`);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png'
    },
    isBase64Encoded: true,
    body: image,
  };
};
