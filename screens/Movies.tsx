import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  RefreshControl,
  View,
  Text,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Poster from "../components/Poster";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const API_KEY = "667f7e62546d1d3f6e90635089e87d03";
// https://api.themoviedb.org/3/movie/now_playing?api_key=667f7e62546d1d3f6e90635089e87d03&language=ko&page=1&region=KR

const TrendingScroll = styled.FlatList``;
const Container = styled.ScrollView``;
const SlideView = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
  /* padding: 0 20px; */
`;
const Movie = styled.View`
  margin-right: 30px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0px;
  font-weight: 500;
  opacity: 0.6;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const queryClient = useQueryClient();
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    //첫번째인자는 api호출시 마지막에 호출한 데이터를 말하고 두번째인자는 이제까지 호출해서 누적된 전체 데이터를 의미함
    //해당 getNextPageParam으로 다음페이지를 구해야한다.
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("refetch");
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (hasNextPage) {
      console.log("load");
      fetchNextPage();
    }
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const renderVMedia = ({ item }: any) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
      fullData={item}
    />
  );

  const renderHMedia = ({ item }: any) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      // onEndReachedThreshold={0.4}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              horizontal
              keyExtractor={(item: any) => item.id + ""}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              showsHorizontalScrollIndicator={false}
              //사이사이 뭐 들어갈건지
              ItemSeparatorComponent={VSeparator}
              data={trendingData?.results}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ListTitle>Comming soon</ListTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
{
  /* <Container
refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
>
<Swiper
  horizontal
  loop
  autoplay
  autoplayTimeout={3.5}
  showsButtons={false}
  showsPagination={false}
  containerStyle={{
    marginBottom: 40,
    width: "100%",
    height: SCREEN_HEIGHT / 4,
  }}
>
  {nowPlaying.map((movie) => (
    <Slide
      key={movie.id}
      backdropPath={movie.backdrop_path || ""}
      posterPath={movie.poster_path || ""}
      originalTitle={movie.original_title}
      voteAverage={movie.vote_average}
      overview={movie.overview}
      fullData={movie}
    />
  ))}
</Swiper>
<ListContainer>
  <ListTitle>Trending Movies</ListTitle>
  <TrendingScroll
    horizontal
    keyExtractor={(item) => item.id + ""}
    contentContainerStyle={{ paddingHorizontal: 30 }}
    showsHorizontalScrollIndicator={false}
    //사이사이 뭐 들어갈건지
    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
    data={trending}
    renderItem={({ item }) => (
      <VMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
        fullData={trending}
      />
    )}
  />
</ListContainer>

<ListTitle>Comming soon</ListTitle>
<FlatList
  data={upcoming}
  keyExtractor={(item) => item.id + ""}
  ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
  renderItem={({ item }) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  )}
/>
</Container> */
}

/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}*/
