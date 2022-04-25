import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie } from "../api";
import VMedia from "./VMedia";

type DataType = Movie | any;

interface HListProps {
  data?: DataType[];
  title: string;
}

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item?.poster_path}
            originalTitle={item.original_title ?? item?.name}
            voteAverage={item?.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
