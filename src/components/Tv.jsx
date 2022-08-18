import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMovieStore } from "../hooks/useMovieStore";
import { SectionCards } from "./SectionCards";

export const Tv = () => {
  const { pageTv } = useSelector((state) => state.wmovie);

  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState({ search: "" });

  const [NumPage, setNumPage] = useState(2);

  const { getDataMovies } = useMovieStore();

  window.scrollTo(0, 0);

  const handleCLick = (e) => {
    e.preventDefault();
    getDataMovies("tv", NumPage);
    setNumPage((NumPage) => NumPage + 1);
  };

  const { search } = inputSearch;

  const { searchData } = useMovieStore();

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
    searchData(search, "tv");
    navigate("/search", { replace: true });
  };

  return (
    <div className="movies__container">
      <div className="movies__title">
        <h1>Tv</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search tv"
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
        {pageTv?.map((card) => {
          if (card.poster_path === undefined) {
            return;
          }
          return <SectionCards key={card.id} card={card} />;
        })}
      </div>

      <button className="btn-more" onClick={(e) => handleCLick(e)}>
        More
      </button>
    </div>
  );
};
