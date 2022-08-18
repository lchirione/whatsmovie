import { useDispatch } from "react-redux";
import apiConfig from "./apiConfig";
import { onPageMovie, onPageTv } from "../store/wmovies";

const { baseUrl, apiKey } = apiConfig;

export const getDataMovies = async (action) => {
  const dispatch = useDispatch();

  let pageMovie = 1;
  let pageTv = 1;

  try {
    const req = await fetch(
      `${baseUrl}${action}/popular?api_key=${apiKey}&language=en-US&page=${
        action == "movie" ? pageMovie : pageTv
      }`
    );
    const resp = await req.json();

    if (action == "movie") {
      dispatch(onPageMovie(resp.results.slice(0, 17)));
      pageMovie++;
      return;
    } /*  else {
      dispatch(onPageTv(resp.results));
      pageTv = pageTv + 1;
      return;
    } */

    if (action == "tv") {
      dispatch(onPageTv(resp.results.slice(0, 17)));
      pageTv++;
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
