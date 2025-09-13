import React from "react";
import "./style.scss";
import MovieForm from "./MovieForm";


const Movie = ({ name, hall, price, poster, likes, dislikes, onEdit, onDelete,onLike, onDislike }) => {

    return (

        <div className="movie-card">

            <div className="image">
                <img src={poster} alt="Poster" />

                <div className="button-section">
                    <button onClick={onLike}>Like</button>
                    <button onClick={onDislike}>Dislike</button>
                </div>

            </div>

            <div className="movie-data">
                <h3>{name}, sala: {hall}, cena: {price} eur</h3>
                <p>👍 {likes}</p>
                <p>👎 {dislikes}</p>

                <div className="edit-deleteBtn-container">
                    <button className="editBtn" onClick={onEdit}>Edit</button>
                    <button className="deleteBtn" onClick={onDelete}>Delete</button>
                </div>
            </div>


        </div>
    )
};

export default Movie;