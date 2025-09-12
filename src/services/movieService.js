import axios from "axios";
import AxiosConfig from "../axiosConfig";

const resource= "/movies"

export async function getAllMovies() {
    const response = await AxiosConfig.get(resource);
    return response.data;
}

export async function createMovie(data){
    const response = await AxiosConfig.post(resource, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}

export async function updateMovie(id, data) {
    const response = await AxiosConfig.put(`${resource}/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
    return response.data;
}
export async function getMovie(id) {
    const response = await AxiosConfig.get(`${resource}/${id}`)
    return response.data;
}