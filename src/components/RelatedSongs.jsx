import { SongBar } from "./";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artisId,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related songs</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artisId}`}
          song={song}
          i={i}
          artistId={artisId}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
