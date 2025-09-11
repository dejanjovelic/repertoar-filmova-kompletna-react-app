import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MovieForm({ onSubmit, movie }) {

    const {
        register,
        handleSubmit,
        reset,
        formState = { errors }
    } = useForm(
        {
            defaultValues: movie || {
                title: '',
                cinemaHall: '',
                price: '',
                poster: ''
            }
        }
    );

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/movies')
    }

    useEffect(() => {
        if (movie) {
            reset(movie);
        }
    }, [movie, reset]);

    const onFormSubmit = (data) => {
        console.log(data)
        onSubmit(data);
        reset();
        handleClick();
    }


    return (
        <div className="form-container">
            
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h1>{movie? (<h3>Edit movie form</h3>):(<h3>Add new movie form</h3>)}</h1>
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
                    {movie ?
                        (<button type="submit">Edit movie</button>)
                        :
                        (<button type="submit">Add movie</button>)
                    }
                </div>

            </form>
        </div>

    );
};

export default MovieForm;