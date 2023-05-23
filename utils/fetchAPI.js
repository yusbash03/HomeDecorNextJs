import axios from "axios";

export const BASE_URL = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "91266b1a30msh2861c71bedc5fbbp12c05fjsn137c5de120d6",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
