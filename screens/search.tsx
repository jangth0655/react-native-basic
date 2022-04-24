import react, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState<any>("");
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovie,
  } = useQuery(["searchMovies", query], movieApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTv();
  };

  const loading = movieLoading || tvLoading;

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="gray"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {loading ? <Loader /> : null}
      {movieData ? (
        <HList title="Movie Results" data={movieData.results} />
      ) : null}
      {tvData ? <HList title="Movie Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
