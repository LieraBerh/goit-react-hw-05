import Navigation from "./components/Navigation/Navigation";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
