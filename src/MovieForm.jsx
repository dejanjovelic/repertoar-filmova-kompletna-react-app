import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovie, updateMovie } from "./services/movieService";

function MovieForm() {

    const [editMovie, setEditingMovie] = useState(null);
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState
    } = useForm(
        {
            mode: "onChange",
            defaultValues: editMovie || {
                name: '',
                hall: '',
                price: '',
                poster: ''
            }
        }
    );



    const navigateAfterClick = () => {
        navigate('/movies')
    }


    useEffect(() => {
        if (!id) return;

        async function getMovieFromDatabase() {
            try {
                const movie = await getMovie(id);
                setEditingMovie(movie);
                reset(movie);
            } catch (error) {
                console.error("Greška prilikom dobavljanja filma", error);
                if (error.response) {
                    if (error.response.status === 404) {
                        setErrorMessage("Film nije pronadjen.");
                    } else if (error.response.status === 500) {
                        setErrorMessage("Greška na serveru. Pokušajte kasnije.");
                    } else {
                        setErrorMessage(`Greška: ${error.response.status}`);
                    }
                } else {
                    setErrorMessage("Greška prilikom dobavljanja filma.");
                }
            }
        }
        getMovieFromDatabase();
    }, [id, reset]);

    const onFormSubmit = async (data) => {
        console.log(data)
        try {
            if (id) {

                const response = await updateMovie(id, data)
                setMessage(`Uspesno ste azurirari film ${editMovie.name}.`)
            }
            else {
                const response = await createMovie(data)
                setMessage("Uspesno ste dodali novi film.")
            }
            setTimeout(() => {
                reset()
                navigateAfterClick();
            }, 2000);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErrorMessage("Film nije pronadjen.")
                } else if (error.response.status === 500) {
                    setErrorMessage("Greska na serveru. Pokusajte kasnije")
                }
                else {
                    setErrorMessage("Greska:", error.response.status)
                }
            }
            console.error(`Greska: ${error.message}`)
        }


    }

    return (
        <div className="form-container">

            <form onSubmit={handleSubmit(onFormSubmit)}>
                {id ? (<h3>Edit movie form</h3>) : (<h3>Add new movie form</h3>)}
                <label>Naziv:</label>
                <input type="text" {...register('name', { required: "Name is required." })} />
                {formState.errors.name && <span style={{ color: 'red' }}>{formState.errors.name.message}</span>}
                <br />

                <label>Sala:</label>
                <input type="number" {...register('hall', {
                    required: "Cinema hall is required.",
                    valueAsNumber: true,
                    min: { value: 1, message: "Please enter a cinema hall number greater than 1." },
                    max: { value: 12, message: "Please enter a cinema hall number less than 12." }
                })} />
                {formState.errors.hall && <span style={{ color: 'red' }}>{formState.errors.hall.message}</span>}
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
                    {id ?
                        (<button type="submit">Update Movie</button>)
                        :
                        (<button type="submit" id="submit-new-movie">Submit New Movie</button>)
                    }
                </div>

            </form>
            <p id="error-message">{errorMessage}</p>
            <p id="success-message">{message}</p>
        </div>

    );
};

export default MovieForm;