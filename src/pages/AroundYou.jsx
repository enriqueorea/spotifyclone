import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";

import React from "react";
import { useGetSongByCountryQuery } from "../redux/services/shazamCores";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongByCountryQuery(country);

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then((res) => {
      setCountry(res.data.country_code);
      setCountryName(res.data.country_name);
      setLoading(false);
    });
  }, [country]);
  if (isFetching && loading) return <Loader title={"searching song details"} />;
  if (error && country) return <Error title={"error fetching song details"} />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You: {countryName}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            song={song}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
