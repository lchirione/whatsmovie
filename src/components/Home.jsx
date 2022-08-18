import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import { onActiveFilm } from "../store/wmovies/wmovies";
import { SectionCards } from "./SectionCards";

export const Home = () => {
  const { trending, tv, isLoading } = useSelector((state) => state?.wmovie);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  window.scrollTo(0, 0);

  if (trending == null && isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const { title, poster_path, backdrop_path, id, overview } = trending[0];

  if (title === undefined || title === null || poster_path === undefined) {
    return;
  }
  const background = apiConfig.originalImage(backdrop_path);

  const myStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url("${background}")`,
  };

  const handleClick = () => {
    dispatch(onActiveFilm(trending[0]));

    navigate("/selected", { replace: true });
  };

  return (
    <div>
      <div className="home__hero" style={myStyle}>
        <div className="home__info">
          <h1>{title}</h1>
          <p>{overview}</p>

          <button onClick={handleClick}>Watch now</button>
        </div>

        <div className="home__card">
          <img src={apiConfig.w500Image(poster_path)} alt={title} />
        </div>
      </div>

      <div className="home__section-container">
        <div className="home__section-title">
          <h1>Trending Movies</h1>

          <button>
            <Link to="/movies">See more</Link>
          </button>
        </div>
        <div className="home__section-cards">
          {trending?.map((card) => {
            return <SectionCards key={card.id} card={card} />;
          })}
        </div>
      </div>

      <div className="home__section-container">
        <div className="home__section-title">
          <h1>Trending Tv</h1>
          <button>
            <Link to="/tv">See more</Link>
          </button>
        </div>
        <div className="home__section-cards">
          {tv?.map((card) => {
            if (card.poster_path == null) {
              return;
            }
            return <SectionCards key={card.id} card={card} />;
          })}
        </div>
      </div>
    </div>
  );
};
