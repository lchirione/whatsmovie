import React, { useEffect } from "react";
import { useMovieStore } from "./hooks/useMovieStore";
import { RouterMovie } from "./routers/RouterMovie";
import { Navbar } from "./components/Navbar";
import "./App.scss";

function App() {
  const { getDataTrending, getDataMovies } = useMovieStore();

  useEffect(() => {
    getDataTrending("movie", "day", "onTrending");
  }, []);

  useEffect(() => {
    getDataTrending("tv", "day", "onTv");
  }, []);

  useEffect(() => {
    getDataMovies("movie");
  }, []);

  useEffect(() => {
    getDataMovies("tv");
  }, []);

  /* try {
    getDataTrending("movie", "day", "onTrending");
  } catch (error) {
    console.log(error);
  } */

  /* try {
    getDataTrending("tv", "day", "onTv");
  } catch (error) {
    console.log(error);
  } */

  return (
    <div className="app__container">
      <Navbar />
      <RouterMovie />
    </div>
  );
}

export default App;
