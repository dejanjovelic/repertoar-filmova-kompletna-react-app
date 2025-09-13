import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";
import { addDislike, addLike, deleteMovie, getAllMovies } from "./services/movieService";
import Spinner from "./Spinner";

const MoviesPage = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');


    async function fetchMovies() {
        try {
            const movies = await getAllMovies();
            setMovies(sortMovies(movies));
        } catch (error) {
            setError("Greska se desila prilikom dobavljanja filmova.");
        }
    }

    const getFormatedDate = () => {
        const today = new Date()
        return today.toLocaleDateString('sr-RS', { day: "2-digit", month: "2-digit", year: "numeric" })
    };

    const navigate = useNavigate();

    const handleAddClick = () => navigate('/addMovie');

    const handleEditClick = (id) => {
        navigate(`/editMovie/${id}`);
    };

    const handleDeleteClick = (id) => {
        async function deleteMovieFromDatabase(id) {
            try {
                await deleteMovie(id);
                setMovies(movies.filter(movie => movie.id !== id))
            } catch (error) {
                setErrorMessage("Brisanje nije uspelo.")
            }
        }
        deleteMovieFromDatabase(id);
        navigate(`/movies`);
    };


    const sortMovies = (arr) =>
        [...arr].sort(
            (a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes)
        )

    useEffect(() => {
        console.log('Setting movies.')
        setIsLoading(true);
        try {
            setTimeout(() => {
                fetchMovies();
                setIsLoading(false)
            }, 1000);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setErrorMessage("Greska na serveru. Pokusajte kasnije")
                }
                else {
                    setErrorMessage("Greska:", error.response.status)
                }
            }
            else if (error.request) {
                setErrorMessage('Nema odgovora sa servera.');
            }
            console.error(`Greska: ${error.message}`)
        }


        return () => {
            console.log('Hiding movies.')
        }

    }, []);


    const handleLike = (id) => {
        async function likedMovie() {
            await addLike(id);
            setMovies(prev =>
                sortMovies(prev.map(movie =>
                    movie.id === id ? { ...movie, likes: movie.likes + 1 } : movie
                )))
        }
        likedMovie();
    };

    const handleDislike = (id) => {
        async function dislikedMovie() {
            await addDislike(id);
            setMovies(prev =>
                sortMovies(prev.map(movie =>
                    movie.id === id ? { ...movie, dislikes: movie.dislikes + 1} : movie
                )))
        }
        dislikedMovie();
    };


    return (
        <div className="main-container">

            <h1>Repertoar za danas ({getFormatedDate()})</h1>
            <br />
            <button id="addBtn" onClick={handleAddClick}>Add movie</button>

            {isLoading && (<Spinner />)}
            <p id="error-message">{errorMessage}</p>

            <div className="movies-container">
                {movies.map((movie) => (
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        name={movie.name}
                        hall={movie.hall}
                        price={movie.price}
                        poster={movie.poster}
                        likes={movie.likes}
                        dislikes={movie.dislikes}
                        onLike={() => handleLike(movie.id)}
                        onDislike={() => handleDislike(movie.id)}
                        onEdit={() => handleEditClick(movie.id)}
                        onDelete={() => handleDeleteClick(movie.id)}
                    />

                ))}

            </div>


        </div>
    )
}

export default MoviesPage;