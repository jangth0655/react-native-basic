const API_KEY = "3af3100f7054af7920ea8afe75251723";
const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

interface VideosResult {
  results: {
    key: string;
    type: string;
    name: string;
    id: string;
  }[];
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

export interface TV {
  poster_path: string;
  backdrop_path: string;
  overview: string;
  original_name: string;
  vote_average: number;
  id: number;
  first_air_date: string;
  name: string;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
  videos?: VideosResult;
}

export interface TvResponse extends BaseResponse {
  results: TV[];
  videos?: VideosResult;
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
  Detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: ({ queryKey }: any) => {
    console.log(queryKey);
    return fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json());
  },
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
  Detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
