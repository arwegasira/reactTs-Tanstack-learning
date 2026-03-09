import axios from 'axios'
export const customFetch = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customFetchDrinks = axios.create({
  baseURL: 'https://boozeapi.com/api/v1/cocktails',
  headers: {
    'Content-Type': 'application/json',
  },
})
