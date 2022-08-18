import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import { numRandom } from "../helpers/numRandom";

export const Footer = () => {
  const { tv } = useSelector((state) => state?.wmovie);

  if (tv === null) {
    return <h1>Loading</h1>;
  }

  const num = numRandom(4, 6);

  const { backdrop_path } = tv[num];

  const background = apiConfig.originalImage(backdrop_path);

  const myStyle = {
    width: "100%",
    backgroundImage: backdrop_path !== null ? `url("${background}")` : null,
  };

  return (
    <div className="footer__container">
      <div className="footer__footer" style={myStyle}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">Tv</Link>
        </nav>
      </div>
    </div>
  );
};
