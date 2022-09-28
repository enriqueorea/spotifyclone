import { Loader, Error, ArtistCard } from "../components";

import React from "react";
import { useGetTopChartsQuery } from "../redux/services/shazamCores";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={"searching song details"} />;
  if (error) return <Error title={"error fetching song details"} />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover top Artist
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <ArtistCard key={song.key} track={song} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
