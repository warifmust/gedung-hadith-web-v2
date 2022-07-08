import axios from "axios"

const BASE_URL = 'http://localhost:3030'

export const getBooks = async () => {
    const { data } = await axios.get(`${BASE_URL}/books`)
    return data
}