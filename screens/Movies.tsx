import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {  Dimensions, ActivityIndicator, useColorScheme, RefreshControl} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Slide from "../components/Slide";


const API_KEY = "667f7e62546d1d3f6e90635089e87d03"
// https://api.themoviedb.org/3/movie/now_playing?api_key=667f7e62546d1d3f6e90635089e87d03&language=ko&page=1&region=KR


const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const Container = styled.ScrollView`
`;
const SlideView = styled.View`
  flex:1;
`;

const Loader = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`

const ListContainer = styled.View`
  margin-bottom: 40px;
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


const {height :SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(true)
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [trending, setTrending] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    console.log('refresg')
    setRefreshing(true);
    await getData()
    setRefreshing(false);
  }, []);

  const getTrending =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setTrending(results)
    console.log('trend',results)

  }
  const getUpComing =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setUpcoming(results)
    console.log('up',results)

  }

  const getNowPlaying =async () => {
    const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`)).json()

    // const json = await res.json()
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    setNowPlaying(results)

  }
  const getData = async  () => {
    await Promise.all([getTrending(), getUpComing(), getNowPlaying()])
    setLoading(false)
  }
  useEffect(() => {
    getData()


  }, [])


  return loading ? <Loader><ActivityIndicator/></Loader> : (
   <Container  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }>
    <Swiper horizontal loop autoplay autoplayTimeout={3.5} showsButtons={false} showsPagination={false}
          containerStyle={{
            marginBottom: 40,
            width: "100%",
            height: SCREEN_HEIGHT / 4,
          }}>
              {nowPlaying.map(movie => <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />)}
            </Swiper>
           <ListContainer>
           <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll contentContainerStyle={{paddingLeft:30}} horizontal showsHorizontalScrollIndicator={false}>{trending.reverse().map(movie => <Movie key={movie.id}><Poster path={movie.poster_path}/><Votes>{movie.vote_average > 0 ? `⭐️ ${movie.vote_average }/10` : `Coming soon`}</Votes></Movie>)}</TrendingScroll>
           </ListContainer>

            <ListTitle>Comming soon</ListTitle>
            {upcoming.map(movie => <HMovie key={movie.id}><Poster path={movie.poster_path}/><HColumn>
            {movie.release_date ? (
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
              </HColumn></HMovie> )}

   </Container>
  );
};

export default Movies;
