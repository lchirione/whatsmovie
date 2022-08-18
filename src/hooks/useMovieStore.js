import { useDispatch } from "react-redux";
import apiConfig from "../api/apiConfig";
import {
  activeFilmData,
  activeFilmDataCredits,
  activeFilmDataTrailer,
  onPageMovie,
  onPageTv,
  onSearch,
  onTrending,
  onTv,
} from "../store/wmovies";

export const useMovieStore = () => {
  const { baseUrl, apiKey } = apiConfig;
  const dispatch = useDispatch();

  const getDataTrending = async (type, time, action) => {
    try {
      const req = await fetch(
        `${baseUrl}trending/${type}/${time}?api_key=${apiKey}`
      );
      const resp = await req.json();

      if (action == "onTrending") {
        dispatch(onTrending(resp.results));
        return;
      }

      if (action == "onTv") {
        dispatch(onTv(resp.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataMovies = async (action, page = 1) => {
    try {
      const req = await fetch(
        `${baseUrl}${action}/popular?api_key=${apiKey}&language=en-US&page=${
          action == "movie" ? page : page
        }`
      );
      const resp = await req.json();

      const data = await resp.results.map((i) => ({
        ...i,
        media_type: action,
      }));

      if (action == "movie") {
        dispatch(onPageMovie(data.slice(0, 17)));
        return;
      }

      if (action == "tv") {
        dispatch(onPageTv(data.slice(0, 17)));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //det data for id
  const getDataId = async (id, media) => {
    try {
      const res = await fetch(
        `${baseUrl}${media}/${id}?api_key=${apiKey}&language=en-US`
      );
      const result = await res.json();

      dispatch(activeFilmData(result));
      return { ...result };
    } catch (error) {
      console.log(error);
    }
  };

  //search credits
  const getDataIdCredits = async (id, media) => {
    try {
      const res = await fetch(
        `${baseUrl}${media}/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      const result = await res.json();

      dispatch(activeFilmDataCredits(result.cast));
    } catch (error) {
      console.log(error);
    }
  };

  //search trailers
  const getDataIdVideos = async (id, media) => {
    try {
      const res = await fetch(
        `${baseUrl}${media}/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      const result = await res.json();

      const trailer = await result.results.filter((t) => t.type === "Trailer");

      dispatch(activeFilmDataTrailer(trailer));
    } catch (error) {
      console.log(error);
    }
  };

  //todo: en proceso
  const searchData = async (name, media) => {
    //https://api.themoviedb.org/3/search/movie?api_key=c61d3fbfafe75c1c1e9c9afe0ba19eb3&language=en-US&query=raya&page=1&include_adult=false

    try {
      const res = await fetch(
        `${baseUrl}search/${media}?api_key=${apiKey}&language=en-US&query=${name}&page=1&include_adult=false`
      );

      const result = await res.json();

      const data = await result.results.map((i) => ({
        ...i,
        media_type: media,
      }));

      dispatch(onSearch(data));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //metodos
    getDataTrending,
    getDataMovies,
    getDataId,
    getDataIdCredits,
    getDataIdVideos,
    searchData,
  };
};
