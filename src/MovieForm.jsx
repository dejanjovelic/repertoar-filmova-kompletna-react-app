import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function MovieForm({ onSubmit }) {

    const { register, handleSubmit, formState, reset } = useForm();

    const onFormSubmit = (data) => {
        console.log(data)
        onSubmit(data)
        reset();
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <label>Naziv:</label>
            <input type="text" {...register('title', { required: "Title is required." })} />
            {formState.errors.title && <span style={{ color: 'red' }}>{formState.errors.title.message}</span>}
            <br />

            <label>Sala:</label>
            <input type="number" {...register('cinemaHall', {
                required: "Cinema hall is required.",
                valueAsNumber: true,
                min: { value: 1, message: "Please enter a cinema hall number greater than 1." },
                max: { value: 12, message: "Please enter a cinema hall number less than 12." }
            })} />
            {formState.errors.cinemaHall && <span style={{ color: 'red' }}>{formState.errors.cinemaHall.message}</span>}
            <br />

            <label>Cena:</label>
            <input type="number" {...register('price',
                {
                    required: "Price is required.",
                    valueAsNumber: true
                })} />
            {formState.errors.price && <span style={{ color: 'red' }}>{formState.errors.price.message}</span>}
            <br />

            <label>Url postera:</label>
            <input type="text" {...register('poster')} />

            <div>
                <button type="submit">Add movie</button>
            </div>

        </form>

    );
};

export default MovieForm;