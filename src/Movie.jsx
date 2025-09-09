import React from "react";
import logo from "./assets/logo.jpg";
import "./style.scss";
import { useState } from "react";

const Movie = ({ title, cinemaHall, price, poster, onEdit }) => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const onLike = () => {
        setLikes((prev) => prev + 1);
    }

    const onDislikes = () => {
        setDislikes((prev) => prev + 1)
    }


    return (

        <div className="movie-container">

            <div className="image">
                <img src={poster} alt="Poster" />

                <div className="button-section">
                    <button onClick={onLike}>Like</button>
                    <button onClick={onDislikes}>Dislike</button>
                </div>
                <div>
                    <button onClick={onEdit}>Edit</button>
                </div>


            </div>

            <div className="movie-data">
                <p>{title}, sala: {cinemaHall}, cena: {price}din</p>
                <p>Like: {likes}</p>
                <p>Dislike: {dislikes}</p>
            </div>

        </div>
    )
};

export default Movie;