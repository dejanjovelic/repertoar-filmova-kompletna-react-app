import React from "react";
import MoviesPage from "./MoviesPage";
import "./style.scss";
import { useState } from "react";
import MovieForm from "./MovieForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";

const App = () => {

  const [movies, setMovies] = useState([
    { title: "Captain America - The first avenger", cinemaHall: 2, price: 350, poster: "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg", like: 0, dislike: 0 },
    { title: "The papillon", cinemaHall: 1, price: 300, poster: "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg", like: 0, dislike: 0 },
    { title: "The lost city of Z", cinemaHall: 5, price: 350, poster: "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", like: 0, dislike: 0 }
  ]);

  const [editingMovie, setEditingMovie] = useState(null);


  const addNewMovie = (movie) => {
    console.log(`data in parent:`, movie)
    setMovies((prev) => ([
      ...prev, {
        ...movie,
        like:0,
        dislike:0
      }
    ]));

  }

  const editMovie = (data) => {
    setMovies(prev => prev.map(movie => movie.title === data.title ? {...movie, ...data}: movie))
    setEditingMovie(null)
  }

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MoviesPage movies={movies} setMovies={setMovies} onEdit={setEditingMovie} />} />
          <Route path="/addMovie" element={<MovieForm onSubmit={addNewMovie} />} />
          <Route path="/editMovie" element={<MovieForm movie={editingMovie} onSubmit={editMovie} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
};

export default App;
