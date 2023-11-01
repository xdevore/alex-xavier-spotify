exports.userCount = (songs, timeSplits) => {
    for (let split of timeSplits) {
        if (split.numSongs === undefined) {
            split.numSongs = 0;
        }
    }

    for (let song of songs) {
        for (let i = 0; i < timeSplits.length; i++) {
            if (song.timestamp >= timeSplits[i].start && song.timestamp < timeSplits[i].end) {
                timeSplits[i].numSongs++;
                break; 
            }
        }
    }
};


exports.idCount = (id, songs, timeSplits, type, dict = {}) => { //id is string or list depending on what is sent - should change name tbh
    let maxCount = 0;

    for (let song of songs) {
        if (type == 'song'){
       
        if ((song.songId !== id)) continue;
        }
      
        
        
        
        if (type == 'genre'){
            if (!(dict[song.songId] && dict[song.songId].genres)) continue;
            if (!(dict[song.songId].genres.some(item => id.includes(item)))) continue;
        }
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

exports.featureData = (song_list,dict) => {
    const norm_val = {
        acousticness: 1,
        danceability: 1,
        energy: 1,
        instrumentalness: 1,
        liveness: 1,
        loudness: -60,  
        speechiness: 1,
        tempo: 200,
        valence: 1
    };

    let Normalized_features = {};
    
   
    song_list.forEach(song => {
       
        if (dict[song.songId]){
        let song_features = dict[song.songId].features[0]
        
        Object.keys(song_features).forEach(key => {

            if (!Normalized_features[key]) {
                Normalized_features[key] = 0;
            }
            
           
            const normFactor = norm_val[key] ? norm_val[key] : 1;  
            Normalized_features[key] += song_features[key] / normFactor;
        });
    }});

   
    Object.keys(Normalized_features).forEach(key => {
        Normalized_features[key] /= song_list.length;
    });

    return Normalized_features;
}






