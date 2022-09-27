import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCores";
const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({
    songid,
  });

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title={"searching song details"} />;
  if (error) return <Error title={"error fetching song details"} />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={""} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lirycs: </h2>
        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1].text.map((line, index) => (
              <p key={index} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p>Not lyrics found</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  );
};

export default SongDetails;
