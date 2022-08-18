import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useMovieStore } from "../hooks/useMovieStore";
import { SectionCards } from "./SectionCards";

export const Search = () => {
  const { dataSearch } = useSelector((state) => state?.wmovie);

  /* const [page, setPage] = useState(2); */

  const [inputSearch, setInputSearch] = useState({ search: "" });

  const { search } = inputSearch;

  const { searchData } = useMovieStore();

  window.scrollTo(0, 0);

  /* const handleCLick = (e) => {
    e.preventDefault();
    getDataMovies("movie", page);
    setPage((page) => page + 1);
  }; */

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
  };

  return (
    <>
      <div className="movies__container">
        <div className="movies__title">
          <h1>Search</h1>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
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

        {dataSearch?.length > 0 ? (
          <div className="movies__cards">
            {dataSearch?.map((card, index) => {
              if (card.poster_path === undefined || card.poster_path === null) {
                return;
              }

              return <SectionCards key={index * 2} card={card} />;
            })}
          </div>
        ) : (
          <div className="notSearch">No matches found</div>
        )}

        {/* <button className="btn-more" onClick={(e) => handleCLick(e)}>
          More
        </button> */}
      </div>
    </>
  );
};
