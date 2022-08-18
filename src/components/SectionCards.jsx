import apiConfig from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onActiveFilm } from "../store/wmovies/wmovies";

export const SectionCards = ({ card, title }) => {
  window.scrollTo(0, 0);

  const {
    media_type,
    original_name,
    original_title,
    id,
    popularity,
    poster_path,
  } = card;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = {
    media_type,
    id,
  };

  const handleClickImage = (data) => {
    dispatch(onActiveFilm(data));

    navigate("/selected", { replace: true });
  };

  return (
    <div className="movie__sectionCard-card">
      <div className="movie__sectionCard-img">
        <img
          onClick={() => handleClickImage(data)}
          src={apiConfig.w500Image(poster_path)}
          alt={original_name}
          width="150px"
          height="200px"
        />
      </div>
      <p>{original_name || original_title}</p>
    </div>
  );
};
