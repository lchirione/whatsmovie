import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import { useMovieStore } from "../hooks/useMovieStore";

export const SelectionCard = () => {
  const { getDataId, getDataIdCredits, getDataIdVideos } = useMovieStore();
  const navigate = useNavigate();

  const { activeFilm } = useSelector((state) => state?.wmovie);

  if (activeFilm === null) {
    return <Navigate to="/" />;
  }

  const { id, media_type } = activeFilm;

  //TODO : LA SECCION MOVIES AND TV NO TIENEN MEDIA_TYPE => AGREGARLO

  useEffect(() => {
    getDataId(id, media_type);
  }, [id, media_type]);

  useEffect(() => {
    getDataIdCredits(id, media_type);
  }, [id, media_type]);

  useEffect(() => {
    getDataIdVideos(id, media_type);
  }, [id, media_type]);

  const { filmData, filmDataCredits, filmDataTrailer, isLoading } = useSelector(
    (state) => state?.wmovie
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (
    filmData === null ||
    filmDataCredits === null ||
    filmDataTrailer === null
  ) {
    return;
  }

  const trailer = filmDataTrailer[0];

  const {
    backdrop_path,
    budget,
    genres,
    original_title,
    name,
    popularity,
    overview,
    poster_path,
    production_companies,
    release_date,
    revenue,
    tagline,
  } = filmData;

  const companies = production_companies?.filter(
    (i) => i.logo_path !== null && i.character !== ""
  );

  const credits = filmDataCredits.filter(
    (actor) => actor.profile_path !== null
  );

  const background = apiConfig.originalImage(backdrop_path);

  const myStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url("${background}")`,
  };

  return (
    <div>
      <div className="selectionCard__hero" style={myStyle}>
        <div className="selectionCard__hero-info">
          <h2>{original_title || name}</h2>
          <p>{overview}</p>
          <h3>{tagline ? tagline : ""}</h3>
          <div className="selectionCard__hero-info-genres">
            {genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
        </div>

        <div className="selectionCard__hero-card">
          <img
            src={apiConfig.w500Image(poster_path)}
            alt={original_title}
            width="250px"
          />
        </div>
      </div>
      <div className="SelectionCard__info">
        <div className="SelectionCard__container">
          <h2>Production companies</h2>
          <div className="SelectionCard__production-companies">
            {companies.map((p) => (
              <div className="production-companies" key={p.id}>
                {/* <h3>{p.name}</h3> */}
                <img src={apiConfig.w500Image(p.logo_path)} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
        {/* companies */}
        <div className="SelectionCard__container-actors">
          {credits.slice(0, 13).map((actor) => (
            <div key={actor.id} className="SelectionCard__actors">
              <div className="SelectionCard__actors-img">
                <img
                  src={apiConfig.originalImage(actor.profile_path)}
                  alt={actor.name}
                  width="150px"
                />
              </div>
              <p className="card-title">
                <span>Name:</span> {actor.name || actor.original_name}
              </p>
              <p className="card-character">
                <span>Character:</span> {actor.character}
              </p>
            </div>
          ))}
        </div>

        {trailer && (
          <div className="SelectionCard__iframe">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
