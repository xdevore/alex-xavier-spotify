exports.userCount = (songs, timeSplits) => {

    
    for (let split of timeSplits) {
        if (split.numSongs === undefined) {
            split.numSongs = 0;
        }
    }

    for (let song of songs) {
        let val = 0;
        const current = song.timestamp;

      
        
        while (val < timeSplits.length && current > timeSplits[val].start) {
            val++;
            
            
        }

       
        if (val != 0 && val != timeSplits.length) {
            timeSplits[val - 1].numSongs++;
       
        }
    }
};

exports.idCount = (id, songs, timeSplits) => {
    let maxCount = 0;

    for (let song of songs) {
        if (song.songId !== id) continue;
        let val = 0;
        const current = song.timestamp;
        while (val < timeSplits.length && current > timeSplits[val].start) {
            val++;
            
            
        }

        if (val != 0 && val != timeSplits.length) {
            timeSplits[val - 1].opacity++;
            maxCount = Math.max(maxCount, timeSplits[val - 1].opacity);
        }
    }

    maxCount--;
    for (let ts of timeSplits) {
        if (ts.opacity && maxCount > 0) {
            ts.opacity = (ts.opacity-1) / maxCount;
        } else {
            ts.opacity = 0;
        }
    }
};

exports.resetOpacity = (timeSplits)=>{
    for (let ts of timeSplits) {
            ts.opacity = 1;
        }
    }





