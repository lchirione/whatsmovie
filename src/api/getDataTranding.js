import apiConfig from "./apiConfig";
import { useDispatch } from "react-redux";
import { onTrending, onTv } from "../store/wmovies/wmovies";

const { baseUrl, apiKey } = apiConfig;

export const getDataTrending = async (type, time, action) => {
  const dispatch = useDispatch();

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
