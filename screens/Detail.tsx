import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}: any) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
    console.log(originalTitle);
  }, []);
  return (
    <Container>
      <Text></Text>
    </Container>
  );
};

export default Detail;
