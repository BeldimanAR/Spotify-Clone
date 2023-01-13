import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DetailsHeader from "../components/DetailsHeader";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RelatedSongs from "../components/RelatedSongs";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  const topSongsData = artistData?.data[0]?.views["top-songs"]?.data;

  // console.log(songData);
  if (isFetchingArtistDetails)
    return <Loader title="Searching artist details" />;

  if (error) return <Error />;

  console.log();

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={topSongsData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
