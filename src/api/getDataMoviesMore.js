import { useDispatch } from "react-redux";
import apiConfig from "./apiConfig";
import { onPageMovie, onPageTv } from "../store/wmovies/wmovies";

const { baseUrl, apiKey } = apiConfig;

export const getDataMoviesMore = async (action) => {
  const dispatch = useDispatch();

  let pageMovie = 2;
  let pageTv = 2;

  try {
    const req = await fetch(
      `${baseUrl}${action}/popular?api_key=${apiKey}&language=en-US&page=${
        action == "movie" ? pageMovie : pageTv
      }`
    );
    const resp = await req.json();

    if (action == "movie") {
      dispatch(onPageMovie(resp.results));
      pageMovie++;
      return;
    } /*  else {
      dispatch(onPageTv(resp.results));
      pageTv = pageTv + 1;
      return;
    } */

    if (action == "tv") {
      dispatch(onPageTv(resp.results));
      pageTv++;
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
