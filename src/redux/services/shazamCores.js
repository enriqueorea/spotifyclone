import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "69f81c6358msh8fc76d66663b5f6p1caacdjsn23a3bd3ca05e",
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "69f81c6358msh8fc76d66663b5f6p1caacdjsn23a3bd3ca05e"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "charts/world",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `artists/details?artist_id=${artistid}`,
    }),
    getSongByCountry: builder.query({
      query: (country) => `charts/country?country_code=${country}`,
    }),
    getSongByGenre: builder.query({
      query: (genre) => `charts/genre-world?genre_code=${genre}`,
    }),
    getSongsBySearch: builder.query({
      query: (search) =>
        `search/multi?search_type=SONGS_ARTISTS&query=${search}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongByGenreQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
