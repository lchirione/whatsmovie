import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Movies } from "../components/Movies";
import { Search } from "../components/Search";
import { SelectionCard } from "../components/SelectionCard";
import { Tv } from "../components/Tv";

export const RouterMovie = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/selected" element={<SelectionCard />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};
