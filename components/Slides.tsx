import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils";
import Poster from "./Poster";

const BgImage = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  margin-top: 5px;
  font-size: 12px;
`;

const Votes = styled(Overview)<{ isDark: boolean }>``;

interface SlideProps {
  backdropPath: string;
  overview: string;
  id: number;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  [key: string]: any;
}

const Slides: React.FC<SlideProps> = ({
  backdropPath,
  overview,
  posterPath,
  originalTitle,
  voteAverage,
  id,
  ...rest
}: SlideProps) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImage
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
            {voteAverage > 0 ? (
              <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
            ) : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slides;
