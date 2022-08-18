import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar__container">
      <div className="navbar__title">
        <i className="fas fa-star"></i>
        Wmovies
      </div>

      <div className="navbar__links">
        <NavLink to="/">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </NavLink>
        <NavLink to="/movies">
          <i className="fas fa-film"></i>
          <span>Movies</span>
        </NavLink>

        <NavLink to="/tv">
          <i className="fas fa-tv"></i>
          <span>Tv</span>
        </NavLink>
      </div>
    </nav>
  );
};
