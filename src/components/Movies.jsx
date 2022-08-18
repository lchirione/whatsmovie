import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMovieStore } from "../hooks/useMovieStore";
import { SectionCards } from "./SectionCards";

export const Movies = () => {
  const { pageMovie } = useSelector((state) => state?.wmovie);

  const navigate = useNavigate();

  const [page, setPage] = useState(2);

  const [inputSearch, setInputSearch] = useState({ search: "" });

  const { search } = inputSearch;

  const { getDataMovies, searchData } = useMovieStore();

  window.scrollTo(0, 0);

  const handleCLick = (e) => {
    e.preventDefault();
    getDataMovies("movie", page);
    setPage((page) => page + 1);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setInputSearch({
      ...inputSearch,
      [name]: value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search === "" || search?.length <= 0) {
      return;
    }
    searchData(search, "movie");
    navigate("/search", { replace: true });
  };

  return (
    <div className="movies__container">
      <div className="movies__title">
        <h1>Movies</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movie"
            autoComplete="off"
            name="search"
            value={search}
            onChange={handleInputChange}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="movies__cards">
        {pageMovie?.map((card, index) => {
          if (card.poster_path === undefined) {
            return;
          }

          return <SectionCards key={index * 2} card={card} />;
        })}
      </div>

      <button className="btn-more" onClick={(e) => handleCLick(e)}>
        More
      </button>
    </div>
  );
};
