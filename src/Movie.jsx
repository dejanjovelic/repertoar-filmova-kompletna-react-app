import React from "react";
import "./style.scss";
import MovieForm from "./MovieForm";


const Movie = ({ name, hall, price, poster, likes, dislikes, onEdit, onLike, onDislike }) => {

    return (

        <div className="movie-card">

            <div className="image">
                <img src={poster} alt="Poster" />

                <div className="button-section">
                    <button onClick={() => onLike(name)}>Like</button>
                    <button onClick={() => onDislike(name)}>Dislike</button>
                </div>

            </div>

            <div className="movie-data">
                <h3>{name}, sala: {hall}, cena: {price} eur</h3>
                <p>👍 {likes}</p>
                <p>👎 {dislikes}</p>

                <div className="editBtn-container">
                    <button className="editBtn" onClick={onEdit}>Edit</button>
                    {console.log(onEdit)}
                </div>
            </div>


        </div>
    )
};

export default Movie;