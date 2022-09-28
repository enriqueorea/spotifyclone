import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";

import React from "react";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCores";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (isFetching) return <Loader title={"searching song details"} />;
  if (error) return <Error title={"error fetching song details"} />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for: {searchTerm}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
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

export default Search;
