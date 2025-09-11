import React from "react";
import logo from "./assets/logo.jpg";
import "./style.scss";


const Movie = ({ title, cinemaHall, price, poster, like, dislike, onEdit, onLike, onDislike }) => {

    return (

        <div className="movie-card">

            <div className="image">
                <img src={poster} alt="Poster" />

                <div className="button-section">
                    <button onClick={() => onLike(title)}>Like</button>
                    <button onClick={() => onDislike(title)}>Dislike</button>
                </div>

            </div>

            <div className="movie-data">
                <h2>{title}, sala: {cinemaHall}, cena: {price}din</h2>
                <p>👍 {like}</p>
                <p>👎 {dislike}</p>

                <div className="editBtn-container">
                    <button className="editBtn" onClick={onEdit}>Edit</button>
                </div>
            </div>


        </div>
    )
};

export default Movie;