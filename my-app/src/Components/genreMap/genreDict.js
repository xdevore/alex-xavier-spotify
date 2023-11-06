import genresArray from './GenreMap.json';

export const genresDictionary = genresArray.reduce((acc, genre) => {
    acc[genre.genre] = { x: genre.x, y: genre.y, color: genre.color};
    return acc;
  }, {});