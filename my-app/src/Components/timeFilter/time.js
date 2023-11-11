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
    const factor = direction === 'forward' ? 1 : -1; 
    const start = moment(range.start).add(factor, unit);
    const end = moment(range.end).add(factor, unit);
    return {
      start: start.valueOf(),
      end: end.valueOf()
    };
}

function moveUp(range, unit){
    const start = moment(range.start).startOf(unit);
    const end = moment(range.end).endOf(unit);

    return {
        start: start.valueOf(),
        end: end.valueOf()
    };
};

function splitRangeIntoSubRanges(range, unit) {
    const lengthMap = {
        year: 12,
        month: moment(range.start).daysInMonth()
    };
    const length = lengthMap[unit];
    let move;
    if (unit == 'year'){
        move = 'month';
    } else {
        move = 'day';
    }

    let result = [];
    for (let index = 0; index < length; index++) {
        const start = moment(range.start).add(index, move);
        const end = start.clone().add(1, move);

        let name;
        if (unit === 'month') {
            name = moment(start).format('DD'); 
        } else if (unit === 'year') {
            name = moment(start).format('MMMM');
        }

        result.push({
            start: start.valueOf(),
            end: end.valueOf(),
            name: name,
            numSongs: 0,
            opacity: 1
          
        });
    }
    return result;
}

module.exports = {
  getCurrentYearRange,
  splitRangeIntoSubRanges,
  moveRange,
  moveUp
};


// const [ranges, setRanges] = useState([...]);  // Your state definition

// function updateSongCounts(songList) {
//   const copiedRanges = [...ranges];  // Shallow copy

//   songList.forEach(song => {
//     // Find the range the song belongs to
//     const range = copiedRanges.find(r => song.timestamp >= r.start && song.timestamp < r.end);

//     // If a range is found, increment its numSongs count
//     if (range) {
//       if (!range.numSongs) {
//         range.numSongs = 1;  // Initialize if it's the first song for this range
//       } else {
//         range.numSongs += 1;
//       }
//     }
//   });

//   // Once all songs have been processed, update the state with the modified array
//   setRanges(copiedRanges);
// }



