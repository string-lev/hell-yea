import axios from "axios";

const BASE_URL = "https://open-weather13.p.rapidapi.com";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/city`, {
      params: {
        city,
        lang: "EN",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || error.response?.data?.error;

      if (status) {
        throw new Error(
          `OpenWeather RapidAPI returned ${status}${
            responseMessage ? `: ${responseMessage}` : ""
          }`,
          { cause: error },
        );
      }

      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Could not reach OpenWeather RapidAPI. Check your network and browser console for a CORS error.",
          { cause: error },
        );
      }
    }

    throw error;
  }
};
