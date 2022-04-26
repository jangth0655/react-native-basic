import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Share,
  TouchableOpacity,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { Movie, movieApi, MovieResponse, TV, tvApi, TvResponse } from "../api";
import Poster from "../components/Poster";
import { makeImagePath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-items: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0 20px;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery<MovieResponse | TvResponse>(
    [isMovie ? "movie" : "tv", params.id],
    isMovie ? movieApi.Detail : tvApi.Detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data?.imdb_id}`
      : data?.hompage;
    if (isAndroid) {
      await Share.share({
        url: isMovie
          ? `https://www.imdb.com/title/${data?.imdb_id}`
          : data?.hompage,
        message: `${params.overview}\nCheck it : ${homepage}`,
        title: "original_title" in params ? "Movie" : "TV Show",
      });
    } else {
      await Share.share({
        url: homepage,
        title: "original_title" in params ? "Movie" : "TV Show",
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share" color="red" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
      headerRight: () => <ShareButton />,
    });
  }, []);
  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    //await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        ></LinearGradient>

        <Column>
          <Poster path={params.poster_path} />
          <Title>
            {"original_title" in params ? params.original_title : params.name}
          </Title>
        </Column>
      </Header>
      <Data>
        <OverView>{params.overview}</OverView>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results.map((video) => (
          <VideoBtn key={video.id} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
