'use strict';
const { getPublicHolidays } = require('./API/getPublicHolidays');

module.exports.publicHolidays = async (event) => {
  const publicHolidays = await getPublicHolidays();
  return {
    statusCode: 200,
    body: JSON.stringify(publicHolidays),
  };
};
