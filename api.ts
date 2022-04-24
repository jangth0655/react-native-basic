const API_KEY = "3af3100f7054af7920ea8afe75251723";
const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  poster_path: string;
  backdrop_path: string;
  overview: string;
  original_title: string;
  vote_average: number;
  id: number;
  release_date: string;
  [key: string]: any;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const movieApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`
    ).then((res) => res.json());
  },
};
