import axios from "axios"

const BASE_URL = 'http://localhost:3030'

export const getHadiths = async () => {
    const { data } = await axios.get(`${BASE_URL}/hadiths`)
    return data
}

export const getHadithById = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}/hadiths/hadith/${id}`)
    return data
}