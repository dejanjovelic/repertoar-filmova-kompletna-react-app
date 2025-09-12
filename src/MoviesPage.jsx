import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "./services/movieService";
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


    const sortMovies = (arr) =>
        [...arr].sort(
            (a, b) => (b.like - b.dislike) - (a.like - a.dislike)
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
            else if(error.request){
                 setErrorMessage('Nema odgovora sa servera.');
            }
            console.error(`Greska: ${error.message}`)
        }


        return () => {
            console.log('Hiding movies.')
        }

    }, []);


    const handleLike = (name) => {
        setMovies(prev =>
            sortMovies(prev.map(movie =>
                movie.name === name ? { ...movie, like: movie.like + 1 } : movie
            )))
    };

    const handleDislike = (name) => {
        setMovies(prev =>
            sortMovies(prev.map(movie =>
                movie.name === name ? { ...movie, dislike: movie.dislike + 1 } : movie
            )))
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
                        onLike={() => handleLike(movie.name)}
                        onDislike={() => handleDislike(movie.name)}
                        onEdit={() => handleEditClick(movie.id)}
                    />

                ))}

            </div>


        </div>
    )
}

export default MoviesPage;