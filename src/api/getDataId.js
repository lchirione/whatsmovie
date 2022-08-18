import React from "react";
import { useDispatch } from "react-redux";
import { activeFilmData } from "../store/wmovies";
import apiConfig from "./apiConfig";

export const getDataId = async (id, media) => {
  const dispatch = useDispatch();
  //https://api.themoviedb.org/3/tv/66732?api_key=c61d3fbfafe75c1c1e9c9afe0ba19eb3&language=en-US
  try {
    const { baseUrl, apiKey } = apiConfig;
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
