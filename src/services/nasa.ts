import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NASAImageResponseDTO, NASAImageRequestDTO } from "../types/nasa";

export const nasaApi = createApi({
  reducerPath: "nasaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.nasa.gov/" }),
  endpoints: (build) => ({
    getNASAImages: build.query<NASAImageResponseDTO[], NASAImageRequestDTO>({
      query: (args) => {
        const { startDate, endDate } = args;
        return `planetary/apod?api_key=${
          import.meta.env.VITE_REACT_APP_NASA_API_KEY
        }&start_date=${startDate}&end_date=${endDate}`;
      },
    }),
  }),
});

export const { useGetNASAImagesQuery, useLazyGetNASAImagesQuery } = nasaApi;
