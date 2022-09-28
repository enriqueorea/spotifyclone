import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";

import React from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCores";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={"searching song details"} />;
  if (error) return <Error title={"error fetching song details"} />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover top charts
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

export default TopCharts;
