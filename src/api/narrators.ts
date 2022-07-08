import axios from "axios"

const BASE_URL = 'http://localhost:3030'

export const getNarrators = async () => {
    const { data } = await axios.get(`${BASE_URL}/narrators`)
    return data
}