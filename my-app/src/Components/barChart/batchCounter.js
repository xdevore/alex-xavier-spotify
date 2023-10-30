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

exports.idCount = (id, songs, timeSplits, type, dict = {}) => { //id is string or list depending on what is sent - should change name tbh
    let maxCount = 0;

    for (let song of songs) {
       
        if ((type == "song") && (song.songId !== id)) continue;
      
     
        if (!(dict[song.songId] && dict[song.songId].genres)) continue;
        
   
        if (!(dict[song.songId].genres.some(item => id.includes(item)))) continue;
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

   
    let logMax = Math.log(maxCount);  

for (let ts of timeSplits) {
    if (ts.opacity) {
        ts.opacity = Math.log(ts.opacity) / logMax; 
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

exports.uniqueSongsDict = (uniqueSongs)=>{
    const  songDict= {};

    uniqueSongs.forEach(item => {
        const { songId, ...restOfObject } = item;  
        songDict[songId] = restOfObject;
    });
    return songDict
}





