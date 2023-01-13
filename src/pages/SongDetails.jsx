import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DetailsHeader from "../components/DetailsHeader";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RelatedSongs from "../components/RelatedSongs";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongsRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongsRelatedQuery(songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // console.log(songData);
  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching song deta" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
