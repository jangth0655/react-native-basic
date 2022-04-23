const API_KEY = "3af3100f7054af7920ea8afe75251723";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

//
const upcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

const nowPlaying = () =>
  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const movies = { trending, upcoming, nowPlaying };
