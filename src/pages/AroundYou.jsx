import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const CountryTracks = () => {
  const [country, setCountry] = useState(" ");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  console.log("data", data);

  //   console.log(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_UnwUhangDAF0SlUfZuY8O65GOlxeX`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // at_UnwUhangDAF0SlUfZuY8O65GOlxeX
  }, [country]);

  if (isFetching && loading)
    return <Loader title="Loading songs around you!" />;

  if (error && country) return <Error />;

  return <div></div>;
};

export default CountryTracks;
