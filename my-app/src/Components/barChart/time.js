const moment = require('moment');
const { extendMoment } = require('moment-range');
const Moment = extendMoment(moment);

function getCurrentYearRange() {
  const currentYear = moment().year();
  const start = moment([currentYear]);
  const end = moment([currentYear + 1]);
  return {
    start: start.valueOf(),
    end: end.valueOf()
  };
}

function moveRange(range, unit, direction) {
    const factor = direction === 'forward' ? 1 : -1; // to determine add or subtract
    const start = moment(range.start).add(factor, unit);
    const end = moment(range.end).add(factor, unit);
    return {
      start: start.valueOf(),
      end: end.valueOf()
    };
  }
  
  function splitRangeIntoSubRanges(range, unit) {
    const lengthMap = {
      year: 12,
      month: moment(range.start).daysInMonth()
    };
    const length = lengthMap[unit];
    
    return Array.from({ length }).map((_, index) => {
      const start = moment(range.start).add(index, unit);
      const end = start.clone().add(1, unit);
      return {
        start: start.valueOf(),
        end: end.valueOf()
      };
    });
  }

module.exports = {
  getCurrentYearRange,
  splitRangeIntoSubRanges,
  moveRange

};


