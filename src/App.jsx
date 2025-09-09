import React from "react";
import Movie from "./Movie";
import "./style.scss";
import { useState } from "react";
import MovieForm from "./MovieForm";

const App = () => {

  const [movies, setMovies] = useState([
    { title: "Captain America - The first avenger", cinemaHall: 2, price: 350, poster: "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg" },
    { title: "The papillon", cinemaHall: 1, price: 300, poster: "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg" },
    { title: "The lost city of Z", cinemaHall: 5, price: 350, poster: "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
  ]);

  const [editingMovie, setEditingMovie] = useState(null);

  const getFormatedDate = () => {
    const today = new Date()
    return today.toLocaleDateString('sr-RS', { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const addNewMovie = (movie) => {
    console.log(`data in parent:`, movie)
    setMovies((prev) => ([
      ...prev, movie
    ]));

  }

  const editMovie = (data) => {
    setMovies(prev => prev.map(movie => movie.title === data.title ? data : movie))
    setEditingMovie(null)
  }


  return (
    <div>
      <h1>Repertoar za danas ({getFormatedDate()})</h1>
      <div>
        {editingMovie ? (
          <MovieForm
            movie={editingMovie}
            onSubmit={editMovie} />
        ) : (

          movies.map((movie) => (
            <Movie
              key={movie.title}
              title={movie.title}
              cinemaHall={movie.cinemaHall}
              price={movie.price}
              poster={movie.poster}
              onEdit={() => setEditingMovie(movie)}
            />
          ))
        )}

      </div>
      <br />
      {
        editingMovie === null && <MovieForm onSubmit={addNewMovie} />
      }

    </div>
  )
};

export default App;
