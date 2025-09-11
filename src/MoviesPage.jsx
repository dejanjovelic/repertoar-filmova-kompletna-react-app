import React, { useEffect } from "react";
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";

const MoviesPage = ({ movies, setMovies, onEdit }) => {



    const getFormatedDate = () => {
        const today = new Date()
        return today.toLocaleDateString('sr-RS', { day: "2-digit", month: "2-digit", year: "numeric" })
    };

    const navigate = useNavigate();

    const handleAddClick = () => navigate('/addMovie');

    const handleEditClick = (movie) => {
        onEdit(movie);
        navigate('/editMovie');
    };

    const randomInt = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;


    const sortMovies = (arr) =>
        [...arr].sort(
            (a, b) => (b.like - b.dislike) - (a.like - a.dislike)
        )

    useEffect(() => {
        setMovies(prev =>
            sortMovies(prev.map(movie => ({
                ...movie,
                like: randomInt(1, 100),
                dislike: randomInt(1, 100),
            })))
        )
    }, []);


    const handleLike = (title) => {
        setMovies(prev =>
            sortMovies(prev.map(movie =>
                movie.title === title ? { ...movie, like: movie.like + 1 } : movie
            )))
    };

    const handleDislike = (title) => {
        setMovies(prev =>
            sortMovies(prev.map(movie =>
                movie.title === title ? { ...movie, dislike: movie.dislike + 1 } : movie
            )))
    };

    useEffect(() => {
        console.log('Setting movies.')
        return () => {
            console.log('Hiding movies.')
        }
    }, []);


    return (
        <div className="main-container">

            <h1>Repertoar za danas ({getFormatedDate()})</h1>
            <br />
             <button id="addBtn"onClick={handleAddClick}>Add movie</button>
            <div className="movies-container">
                {movies.map((movie) => (
                    <Movie
                        key={movie.title}
                        title={movie.title}
                        cinemaHall={movie.cinemaHall}
                        price={movie.price}
                        poster={movie.poster}
                        like={movie.like}
                        dislike={movie.dislike}
                        onEdit={() => handleEditClick(movie)}
                        onLike={() => handleLike(movie.title)}
                        onDislike={() => handleDislike(movie.title)}
                    />

                ))}
            </div>
           

        </div>
    )
}

export default MoviesPage;