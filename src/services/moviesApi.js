import http from "../utils/http";

const searchNMovies = async (query, page = 1) => {
  const { data } = await http.get(`/movies?s=${query}&page=${page}`);
  return data;
};

const getMovieById = async (id) => {
  const { data } = await http.get(`/movies/${id}`);
  return data;
};

const startWatchMovie = async (id) => {
  const { data } = await http.get(`/movies/${id}/start-watch`);
  return data;
};

const getMovieStatusByM3u8 = async (hash) => {
  try {
    const { data } = await http.get(`/static/${hash}/playlist.m3u8`);

    if (!data.includes(".ts")) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const getPlayerData = async (hash) => {
  const { data } = await http.get(`/static/${hash}/media.json`);
  return data;
};

export default {
  searchNMovies,
  getMovieById,
  startWatchMovie,
  getMovieStatusByM3u8,
  getPlayerData,
};
